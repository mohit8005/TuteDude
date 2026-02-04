import React from 'react'
import useFetch from '../hooks/useFetch'



function ProductList() {

    const {data, loading, error} = useFetch(
        'https://api.escuelajs.co/api/v1/products'
    );

    


    if (loading) return <h2 className='flex justify-center items-center h-screen'>Loading....</h2>
    if (error ) return <h2 className='flex justify-center items-center h-screen'>Error : {error}</h2>

  return (
    <div>

        <h1 className='text-center text-4xl my-5 font-bold'>Product</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {data.map((item) => (
                <div key={item.id} className='border p-3 px-7 rounded-lg' >
                    <img src={item.images[0]} alt={item.title} className='h-70 w-full bg-red-400' />
                    {console.log(item.image)};
                    
                    <h3 className='font-semibold mt-2 text-center'>{item.title}</h3>
                    <p className='text-center'> ₹ {item.price}</p>
                    <p>
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default ProductList
