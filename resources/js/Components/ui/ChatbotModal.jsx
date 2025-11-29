import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

export default function ChatbotModal({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: null,
        loading: false,
        error: null
    });
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: 'Halo! Saya adalah asisten virtual Citraloka. Ada yang bisa saya bantu?',
            timestamp: new Date()
        }
    ]);

    // Function to get user's location
    const getUserLocation = () => {
        setLocation(prev => ({ ...prev, loading: true, error: null }));

        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                loading: false,
                error: 'Geolocation tidak didukung oleh browser ini'
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Optional: Get address from coordinates using reverse geocoding
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
                    );
                    const data = await response.json();
                    const address = data.results?.[0]?.formatted || null;

                    setLocation({
                        latitude,
                        longitude,
                        address,
                        loading: false,
                        error: null
                    });

                    // Add bot message about location
                    const locationMessage = {
                        type: 'bot',
                        text: `Lokasi Anda berhasil terdeteksi! ${address ? `Anda berada di: ${address}` : `Koordinat: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`}`,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, locationMessage]);

                } catch (error) {
                    setLocation({
                        latitude,
                        longitude,
                        address: null,
                        loading: false,
                        error: null
                    });

                    const locationMessage = {
                        type: 'bot',
                        text: `Lokasi Anda: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, locationMessage]);
                }
            },
            (error) => {
                let errorMessage = 'Gagal mendapatkan lokasi';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Akses lokasi ditolak. Silakan izinkan akses lokasi.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Informasi lokasi tidak tersedia.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Permintaan lokasi timeout.';
                        break;
                }

                setLocation(prev => ({
                    ...prev,
                    loading: false,
                    error: errorMessage
                }));

                const errorBotMessage = {
                    type: 'bot',
                    text: errorMessage,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorBotMessage]);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            text: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);

        // Check if user is asking for location
        const locationKeywords = ['lokasi', 'location', 'gps', 'posisi', 'dimana'];
        const isLocationRequest = locationKeywords.some(keyword =>
            message.toLowerCase().includes(keyword)
        );

        setMessage('');

        // Send message to chatbot API
        try {
            const payload = {
                prompt: message,
                latitude: location.latitude,
                longitude: location.longitude,
            };

            // Add typing indicator
            const typingMessage = {
                type: 'bot',
                text: 'Mengetik...',
                timestamp: new Date(),
                isTyping: true
            };
            setMessages(prev => [...prev, typingMessage]);

            const response = await fetch('/api/chatbot/generate-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            // Remove typing indicator and add actual response
            setMessages(prev => {
                const filteredMessages = prev.filter(msg => !msg.isTyping);
                return [
                    ...filteredMessages,
                    {
                        type: 'bot',
                        text: data.response || 'Maaf, terjadi kesalahan. Silakan coba lagi.',
                        timestamp: new Date()
                    }
                ];
            });

        } catch (error) {
            console.error('Error sending message:', error);

            // Remove typing indicator and add error message
            setMessages(prev => {
                const filteredMessages = prev.filter(msg => !msg.isTyping);
                return [
                    ...filteredMessages,
                    {
                        type: 'bot',
                        text: 'Maaf, terjadi kesalahan dalam menghubungi server. Silakan coba lagi.',
                        timestamp: new Date()
                    }
                ];
            });
        }
    };

    // Auto-request location when modal opens (optional)
    useEffect(() => {
        if (isOpen && !location.latitude && !location.loading) {
            // Uncomment the line below to auto-request location when modal opens
            // getUserLocation();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-opaque rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold">Citraloka Assistant</h3>
                            <p className="text-xs text-gray-500">
                                {location.loading ? 'Mendapatkan lokasi...' : 'Online'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Location button */}
                        <button
                            onClick={getUserLocation}
                            disabled={location.loading}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            title="Dapatkan lokasi"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className={`w-4 h-4 ${location.loading ? 'animate-spin' : ''} ${location.latitude ? 'text-green-500' : ''}`}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${msg.type === 'user'
                                    ? 'bg-primary-opaque text-white'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                <p className="text-sm">
                                    <Markdown>  
                                        {msg.text}
                                    </Markdown>
                                </p>
                                <p className="text-xs mt-1 opacity-70">
                                    {msg.timestamp.toLocaleTimeString('id-ID', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ketik pesan Anda..."
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-opaque"
                        />
                        <button
                            type="submit"
                            className="bg-primary-opaque hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}