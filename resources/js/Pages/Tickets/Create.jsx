import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({auth, categories}) {
  //State untuk form dengan Inertia.js
  const { data, setData, post, errors, processing } = useForm({
    ticket_category_id: '',
    qty: '',
    price_per_pack: ''
  });

  //Handle submit form
  const handleCreateData = (e) => {
    e.preventDefault();

    post(route('tickets.store'), {
      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Ticket created successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Ticket</h2>}
    >
    <Head title={'Create Ticket'}/>
    <Container>
        <Card title={'Create Ticket'}>
            <form onSubmit={handleCreateData}>
                {/* Pilihan Jenis Tiket */}
                <div className="mb-4">
                  <label className="block font-medium text-sm text-gray-700">Ticket Type</label>
                  <select 
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50"
                      value={data.ticket_category_id} 
                      onChange={e => setData('ticket_category_id', e.target.value)}
                  >
                    <option value="">Select Ticket Type</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  {errors.ticket_category_id && <div className="text-red-500 text-sm mt-1">{errors.ticket_category_id}</div>}
                </div>

                {/* Input Harga Tiket */}
                <div className="mb-4">
                  <Input 
                      label="Price (Rp)" 
                      type="number" 
                      value={data.price_per_pack} 
                      onChange={e => setData('price_per_pack', e.target.value ? parseFloat(e.target.value) : '')}
                      errors={errors.price_per_pack} 
                      placeholder="Enter ticket price..."
                  />
                </div>

                {/* Input Jumlah Tiket */}
                <div className="mb-4">
                  <Input 
                      label="Quantity" 
                      type="number" 
                      value={data.qty} 
                      onChange={e => setData('qty', e.target.value ? parseInt(e.target.value) : '')}
                      errors={errors.qty} 
                      placeholder="Enter ticket quantity..."
                  />
                </div>

                <div className='flex items-center gap-2'>
                    <Button type='submit' disabled={processing}> Save </Button>
                    <Button type='cancel' url={route('tickets.index')}>Cancel</Button>
                </div>
            </form>
        </Card>
    </Container>
    </AuthenticatedLayout>
  )
}
