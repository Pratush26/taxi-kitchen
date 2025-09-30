import './App.css'
import Navbar from './components/Navbar'
import CookImg from './assets/cook-bg.gif'
import { Suspense, useState } from 'react'
import { LuCookingPot, LuTicketCheck } from 'react-icons/lu'
import { RiFileList3Line } from 'react-icons/ri'
import CurrentOrder from './components/CurrentOrder'

const clientOrder = async () => {
  const res = await (await fetch("/orders.json")).json();
  return res;
}
const orderList = clientOrder()

export default function App() {
  const [order, setOrder] = useState([]);
  const [cooking, setCooking] = useState([]);
  const [ready, setReady] = useState([]);
  
  const handleOrder = (info) => {
    let data = order.filter(e => e.id != info.id)
    setOrder(data)
    setCooking(prev => [...prev, info])
  }
  const handleCooked = (info) => {
    let data = cooking.filter(e => e.id != info.id)
    setCooking(data)
    setReady(prev => [...prev, info])
  }

  return (
    <main>
      <Navbar />
      <div id='hero' className='flex flex-col items-center justify-center h-[30vh] text-white w-full text-4xl font-semibold'>
        <img src={CookImg} alt="cook" className='h-2/3 w-auto' />
        <p>Kitchen Room</p>
      </div>
      <section className='container mx-auto grid grid-cols-3 place-content-center gap-4 m-6'>
        <div className='border-amber-300 border-dotted border-2 rounded-lg p-5 flex items-center justify-center gap-4'>
          <RiFileList3Line className='text-yellow-400 text-7xl' />
          <span>
            <p>Current Orders</p>
            <strong className='text-2xl'>{order.length}</strong>
          </span>
        </div>
        <div className='border-amber-300 border-dotted border-2 rounded-lg p-5 flex items-center justify-center gap-4'>
          <LuCookingPot className='text-yellow-400 text-7xl' />
          <span>
            <p>Currently Cooking</p>
            <strong className='text-2xl'>{cooking.length}</strong>
          </span>
        </div>
        <div className='border-amber-300 border-dotted border-2 rounded-lg p-5 flex items-center justify-center gap-4'>
          <LuTicketCheck className='text-yellow-400 text-7xl' />
          <span>
            <p>Ready to Serve</p>
            <strong className='text-2xl'>{ready.length}</strong>
          </span>
        </div>
      </section>
      <section className='container mx-auto grid grid-cols-[60%_40%] gap-6 place-content-center my-3'>
        <article className='space-y-2'>
          <h2 className='text-xl font-semibold'>Current Orders</h2>
          <Suspense fallback={<p>Loading...</p>}>
          <CurrentOrder orderList={orderList} setOrder={setOrder} order={order} handleOrder={handleOrder} />
          </Suspense>
        </article>
        <aside className='space-y-2'>
          <h2 className='text-xl font-semibold'>Cooking</h2>
          <div className='border-2 p-3 border-gray-300 rounded-2xl space-y-2'>
          {
            cooking.map(e => (
            <div key={e.id} className='border-1 px-6 py-4 border-gray-300 rounded-2xl space-y-1'>
              <p className='text-amber-400 text-lg font-semibold'>{e.order_title}</p>
              <p className='text-sm font-semibold text-gray-800'>Quantity : {e.quantity}</p>
              <p className='text-xs font-medium text-gray-500'>{e.special_instruction}</p>
              <button onClick={() => handleCooked(e)} className='bg-amber-400 px-4 py-2 rounded-full font-semibold text-sm'>Cooked ?</button>
            </div>
            ))
          }
          </div>
          <h3 className='text-xl font-semibold'>Ready to Serve</h3>
          <div className='border-2 p-3 border-gray-300 rounded-2xl space-y-2'>
            {
              ready.map(e => (
            <div key={e.id} className='border-1 p-4 space-y-1 border-gray-700 bg-emerald-50 rounded-2xl text-sm font-medium text-gray-800'>
              <p className='text-emerald-700 font-semibold text-base'>{e.order_title}</p>
              <p>Table : {e.table_no}</p>
              <p>Waiter ID : {e.waiterId}</p>
              <p className='text-gray-600'>Cooking Time : {new Date().toLocaleTimeString()}</p>
            </div>
              ))
            }
          </div>
        </aside>
      </section>
    </main>
  )
}