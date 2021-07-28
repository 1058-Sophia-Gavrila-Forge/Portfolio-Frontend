import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container , Table , Row , Col} from 'react-bootstrap'
import '../css/HonorAwards.css'
import { render } from 'react-dom'
import {Link} from 'react-router-dom'
import { CSSProperties } from 'react'
import { useCookies } from 'react-cookie'
import {toast} from "react-toastify";
import {portfolioUrl} from "../api/api";

const Adminpage = () => {
    // state variable for all portfolios
    const[portfolios,setPortfolios] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies()


    let ButtonStyles: CSSProperties = {
        background: "rgb(115, 165, 194)",
        borderColor: "rgb(242, 105, 3)",
        color: "black"
    }

    // function to display all portfolios that store in state variable "portfolios"
    const renderportfolio = (p:any,index:number)=> {
        //create a query string for url
        const portid = "/Portfoliodetails?id=" + p.id
        //return jsx 
        return (
            <tr>
                <td>{p.name}</td>
                <td>{p.submitted ? 'Submitted' : 'Pending'}</td>
                <td>{p.approved ? 'Approved': 'Rejected'}</td>
                <td>{p.reviewed ? 'Review Completed' : 'Yet to be reviewed'}</td>
                <td>{p.feedback}</td>
                <td><button className = "btn" style={ButtonStyles}><Link to = {portid}>Edit </Link></button></td>
                <td> <button className = "btn" style={ButtonStyles} onClick={()=>renderviewdetail(p.id)}>View Portfolio Details</button> </td>            
            </tr>
        )
    }

    const renderviewdetail = (id:any):void=>{
        let pathname = "./view";
        axios.get(`${portfolioUrl}/portfolios/${id}`)
            .then(response => {
                setCookie('portfolio', response.data, { path: "/" });
                window.location.pathname = pathname;
            })
            .catch(error => {
                toast.error(error.message)
            })

    }

    const handleLogOut = () => {
        removeCookie('user', {maxAge: 0})
        removeCookie('admin');
        if (cookies['portfolio']) {
            removeCookie('portfolio', {maxAge: 0})
        }
        window.location.pathname = "./"
    }


    // function to fetch all portfolios from back end using axios
    

    const getData = async() => {
        axios.get(portfolioUrl)
         .then(response => {

            setPortfolios(response.data)
            console.log (response.data)
         })
    }

    // this will be call every time setState() is called
    useEffect(() => {getData()}, [portfolios])

    return (
        
        <div> 



            <Container>  

            <div className="container mb-1 mt-1" id="editPortfolioButtons">
                
                <button  style={ButtonStyles} onClick={() => handleLogOut()}>Logout</button>
            
        </div>


            <h3>   Portfolios  </h3>

               
                <Row>
                    <Col lg={10}>
                        <Table striped table-bordered hover  >
                            <thead>
                                <tr> 
                                    <th>Portfolio Name</th>
                                    <th>Submitted/Pending</th>
                                    <th>Approved/Rejected </th>
                                    <th>ReviewStatus </th>
                                    <th>Feedback</th>
                                    <th>Edit</th>
                                    <th>View Portfolio Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                
                                portfolios.map(renderportfolio)

                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
 
export default Adminpage
