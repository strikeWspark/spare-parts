
import React, { useEffect, useState } from 'react';
import ViewProducts from './ViewProducts';

export default function AddProduct(){

    const [itemName,setItemName] = useState('')
    const [itemDescription,setItemDescription] = useState('')
    const [quantity,setQuantity] = useState(0)
    const [rating,setRating] = useState(1)
    const [itemPrice,setItemPrice] = useState(0.0)
    const [itemBrand,setItemBrand] = useState('')
    const [items,setItems] = useState([])
    

    const handleClick = (e) =>{
        e.preventDefault()
        const item = {itemName,itemDescription,quantity,rating,itemPrice,itemBrand,}
        console.log(item)
        fetch("http://localhost:8080/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(item)
        }).then(() => {
            console.log("Data Saved Successfully")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/")
        .then(res => res.json())
        .then((result) =>{
            setItems(result);
            
        }
        )
    },[])

    return (
        <>
        <h1>Add Product</h1> 
        <center>
            <form>
                <input type="text" label="Item Name" value={itemName} onChange={(e)=> setItemName(e.target.value)}/>
                <input type="text" label="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}/>
                <input type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <input type="number" label="Rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
                <input type="number" label="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
                <input type="text" label="Brand" value={itemBrand} onChange={(e) => setItemBrand(e.target.value)}/>
                <button onClick={handleClick}>Click To Save</button>
            </form>
        </center>

        {items.map(item=>(
            <div key={item.id}>
        Id:{item.id}<br/>
         Name:{item.itemName}<br/>
         Quantity:{item.quantity}<br/>
         DesCription:{item.itemDescription}<br/>
         Price:{item.itemPrice}<br/>
         Brand:{item.itemBrand}

        

            </div>
         
        
      ))
}
        <ViewProducts items = {items}/>
        </>
    )
}