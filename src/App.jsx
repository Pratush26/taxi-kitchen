import './App.css'
import Navbar from './components/Navbar'
import CookImg from './assets/cook-bg.gif'
import { Suspense, useState } from 'react'
import { LuCookingPot, LuTicketCheck } from 'react-icons/lu'
import { RiFileList3Line } from 'react-icons/ri'
import CurrentOrder from './components/CurrentOrder'
import { GiCook } from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';

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
    toast(`Cooking ${info.order_title}`)
    setCooking(prev => [...prev, info])
  }
  const handleCooked = (info) => {
    let data = cooking.filter(e => e.id != info.id)
    setCooking(data)
    toast.success(`${info.order_title} is ready to serve`)
    info.time = new Date().toLocaleTimeString()
    setReady(prev => [...prev, info])
  }

  return (
    <main>
      <ToastContainer theme='dark' />
      <Navbar />
      <div id='hero' className='flex items-start pt-10 justify-center h-[30vh] text-white w-full text-5xl font-semibold'>
        <GiCook />
        <p>Kitchen Room</p>
      </div>
      <section className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 place-content-center gap-4 m-6'>
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
      <section className='w-5/6 mx-auto grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 place-content-center my-3'>
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
            <div key={e.id} className='border-1 cooking px-6 py-4 border-gray-300 rounded-2xl space-y-1'>
              <p className='text-amber-800 text-lg font-semibold'>{e.order_title}</p>
              <p className='text-sm font-semibold text-gray-800'>Quantity : {e.quantity}</p>
              <p className='text-xs font-medium text-gray-800'>{e.special_instruction}</p>
              <button onClick={() => handleCooked(e)} className='bg-amber-700 cursor-pointer text-white px-4 py-2 rounded-full font-semibold text-sm'>Cooked ?</button>
            </div>
            ))
          }
          </div>
          <h3 className='text-xl font-semibold'>Ready to Serve</h3>
          <div className='border-2 p-3 border-gray-300 rounded-2xl space-y-2'>
            {
              ready.map(e => (
            <div key={e.id} className='border-1 p-4 space-y-1 border-gray-400 bg-emerald-50 rounded-2xl text-sm font-medium text-gray-800'>
              <p className='text-emerald-700 font-semibold text-base'>{e.order_title}</p>
              <p>Table : {e.table_no}</p>
              <p>Waiter ID : {e.waiterId}</p>
              <p className='text-gray-600'>Cooking Time : {e.time}</p>
            </div>
              ))
            }
          </div>
        </aside>
      </section>
    </main>
  )
}