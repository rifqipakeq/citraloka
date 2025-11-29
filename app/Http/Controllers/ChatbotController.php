<?php

namespace App\Http\Controllers;

use Gemini\Laravel\Facades\Gemini;
use Google\Cloud\AIPlatform\V1\ClientConnectionConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

use function Illuminate\Log\log;

class ChatbotController extends Controller
{
    public function generateResponse(Request $request) {
        $prompt = $request->input('prompt');
        $userLat = $request->input('latitude');
        $userLng = $request->input('longitude');

        Log::info('Received prompt: ' . $prompt);
        
        $locationData = \App\Models\Locations::select('id', 'title', 'description', 'address', 'category_id', 'latitude', 'longitude')
            ->get()
            ->map(function($item) use ($userLat, $userLng) {
                $location = [
                    'id' => $item->id,
                    'name' => $item->title,
                    'description' => $item->description,
                    'address' => $item->address,
                    'category_id' => $item->category_id,
                    'latitude' => $item->latitude,
                    'longitude' => $item->longitude,
                    'detail_url' => route('detail.index', $item->id)
                ];

                if ($userLat && $userLng && $item->latitude && $item->longitude) {
                    $location['distance'] = $this->calculateHaversineDistance(
                        $userLat, $userLng, $item->latitude, $item->longitude
                    );
                }

                return $location;
            })
            ->when($userLat && $userLng, function($collection) {
                return $collection->sortBy('distance');
            });

        $locationContext = "Berikut adalah data tempat wisata yang tersedia:\n";
        foreach($locationData as $location) {
            $distanceInfo = isset($location['distance']) ? " (Jarak: " . round($location['distance'], 2) . " km)" : "";
            $locationContext .= "- {$location['name']} di {$location['address']} (Kategori ID: {$location['category_id']}){$distanceInfo} - Link: {$location['detail_url']}\n";
        }

        $tourismKeywords = ['wisata', 'tempat', 'destinasi', 'liburan', 'jalan-jalan', 'rekreasi', 'objek wisata', 'tourism', 'travel', 'vacation', 'holiday', 'visit', 'attraction'];
        $isRelatedToTourism = false;
        
        foreach ($tourismKeywords as $keyword) {
            if (stripos($prompt, $keyword) !== false) {
            $isRelatedToTourism = true;
            break;
            }
        }

        if (!$isRelatedToTourism) {
            return response()->json([
            'response' => 'Maaf, saya adalah asisten wisata yang khusus membantu Anda menemukan informasi tentang tempat wisata. Silakan ajukan pertanyaan seputar destinasi wisata, rekomendasi tempat, atau informasi travel lainnya.',
            ]);
        }

        $systemPrompt = "Anda adalah asisten wisata yang membantu merekomendasikan tempat wisata. " .
            "Berikan rekomendasi berdasarkan data berikut dan sertakan link detail untuk setiap rekomendasi. " .
            ($userLat && $userLng ? "Data sudah diurutkan berdasarkan jarak terdekat dari lokasi pengguna. " : "") .
            $locationContext;

        $fullPrompt = $systemPrompt . "\n\nPertanyaan pengguna: " . $prompt;

        $result = Gemini::generativeModel(model: 'gemini-2.0-flash')->generateContent($fullPrompt);
        
        return response()->json([
            'response' => $result->text(),
        ]);
    }

    private function calculateHaversineDistance($lat1, $lng1, $lat2, $lng2) {
        $earthRadius = 6371; 

        $lat1Rad = deg2rad($lat1);
        $lat2Rad = deg2rad($lat2);
        $deltaLatRad = deg2rad($lat2 - $lat1);
        $deltaLngRad = deg2rad($lng2 - $lng1);

        $a = sin($deltaLatRad/2) * sin($deltaLatRad/2) +
             cos($lat1Rad) * cos($lat2Rad) *
             sin($deltaLngRad/2) * sin($deltaLngRad/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        return $earthRadius * $c;
    }
}
