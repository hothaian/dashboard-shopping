import React from "react"
import Cards from "../components/cards/Cards"
import Charts from "../components/charts/Charts"
import Table from '../components/table/Table';


const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>DashBoard</h3>
            <span>Admin</span>
          </div>
          <Cards />
          <Charts />
          <Table/>
       


        </div>
      </section>
    </>
  )
}

export default Home