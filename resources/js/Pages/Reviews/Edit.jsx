import React from 'react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export const InteractiveRatingStars = ({ label, rating, max = 5, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block font-medium text-sm text-gray-700 mb-1">{label}</label>
            <div className="flex gap-1">
                {Array.from({ length: max }, (_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={index}
                            onClick={() => onChange(starValue)}
                            className={`text-3xl cursor-pointer ${
                                starValue <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        >
                            ★
                        </span>
                    );
                })}
                <span className="ml-2 text-gray-600 text-sm">({rating} / {max})</span>
            </div>
        </div>
    );
};

export default function Edit({auth}) {

    //destruct reviews from usepage props
    const { review, locations, transactions } = usePage().props;

    //define state with helper inertia
    const { data, setData, put, errors } = useForm({
        location_id: review.location_id,
        transaction_id: review.transaction_id,
        review: review.review,
        rate_kebersihan: review.rate_kebersihan,
        rate_keakuratan: review.rate_keakuratan,
        rate_checkin: review.rate_checkin,
        rate_komunikasi: review.rate_komunikasi,
        rate_lokasi: review.rate_lokasi,
        rate_nilaiekonomis: review.rate_nilaiekonomis,
        _method: 'put'
    });

    // define method handleUpdate
    const handleUpdate = (e) => {
        e.preventDefault();

        put(route('reviews.update', review.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Review updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    const selectedLocation = locations.find(location => location.id == data.location_id);
    const selectedTransaction = transactions.find(transaction => transaction.id == data.transaction_id);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Edit Review</h2>}
        >
        <Head title={'Edit Review'}/>
        <Container>
            <Card title={'Edit Review'}>
                <form onSubmit={handleUpdate}>

                    <div className="mb-4">
                        <label className="block font-medium text-sm text-gray-700">User</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-xs bg-gray-100"
                            value={auth.user.name}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm text-gray-700">Location</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-xs bg-gray-100"
                            value={selectedLocation ? selectedLocation.title : 'Unknown'}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-sm text-gray-700">Transaction</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-xs bg-gray-100"
                            value={selectedTransaction ? selectedTransaction.code : 'Unknown'}
                            disabled
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <InteractiveRatingStars
                            label="Kebersihan"
                            rating={data.rate_kebersihan}
                            onChange={(val) => setData('rate_kebersihan', val)}
                        />
                        <InteractiveRatingStars
                            label="Keakuratan"
                            rating={data.rate_keakuratan}
                            onChange={(val) => setData('rate_keakuratan', val)}
                        />
                        <InteractiveRatingStars
                            label="Check In"
                            rating={data.rate_checkin}
                            onChange={(val) => setData('rate_checkin', val)}
                        />
                        <InteractiveRatingStars
                            label="Komunikasi"
                            rating={data.rate_komunikasi}
                            onChange={(val) => setData('rate_komunikasi', val)}
                        />
                        <InteractiveRatingStars
                            label="Lokasi"
                            rating={data.rate_lokasi}
                            onChange={(val) => setData('rate_lokasi', val)}
                        />
                        <InteractiveRatingStars
                            label="Nilai Ekonomis"
                            rating={data.rate_nilaiekonomis}
                            onChange={(val) => setData('rate_nilaiekonomis', val)}
                        />
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button type={'submit'}>Update</Button>
                        <Button type={'cancel'} url={route('reviews.index')}>Cancel</Button>
                    </div>
                </form>
            </Card>
        </Container>
        </AuthenticatedLayout>
    )
}
