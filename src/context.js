import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data'
//import { format } from 'url';

const ProductContext = React.createContext();
//Provider
//Consumer


class ProductProvider extends Component {
  state={
        //products:storeProducts,
        products:[],
        detailProduct: detailProduct,
        cart:[],
       //cart:storeProducts,
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
  }
componentDidMount(){
  this.setProducts();
}
  setProducts=()=>{
    let tempProducts=[];
    storeProducts.forEach(item=>{
      const singleItem={...item};
      tempProducts=[...tempProducts,singleItem];
    })
    this.setState(()=>{
      return {products:tempProducts};
    })
  }
  
 getItem = id=>{
   const product =this.state.products.find(item=>item.id===id);
   return product;
 }

  handleDetail= id =>{
    //debugger;
    //console.log(id);
    const product=this.getItem(id);
    this.setState(()=>{

      console.log(product);
      return {detailProduct:product}
    })
  }

  addToCart= id =>{
   
    //console.log(`hello from add to card cart.id is ${id}`)
  //  debugger;
    let tempProducts=[...this.state.products];
    //console.log(tempProducts);

    const index=tempProducts.indexOf(this.getItem(id));
    
   const product =tempProducts[index];
    product.inCart=true;
    product.count=1;
    const price = product.price;
    product.total=price;
    this.setState(()=>{
      return {products:tempProducts, cart:[...this.state.cart,product]}
    },
  
    ()=>{console.log(this.state)
   
    })
   
  }
 
 openModal=id=>{
   const product =this.getItem(id);
   this.setState(()=>{
     return {modalProduct:product,modalOpen:true}
   })
 }

 closeModal=()=>{
   this.setState(() =>{
    return{modalOpen:false}
   })
 }
 
 increment=(id)=>{
   console.log("increment method")  
 }
  
 decrement=(id)=>{
  console.log("decrement method")  
}
removeItem=(id)=>{
  console.log("item removed")
}

clearCart=()=>{
  console.log("cart cleared")
}
  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart:this.addToCart,
        openModal:this.openModal,
        closeModal:this.closeModal,
        increment:this.increment,
        decrement:this.decrement,
        removeItem:this.removeItem,
        clearCart:this.clearCart
      
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};
