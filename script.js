const resultContainer = document.querySelector('.resultContainer');
const searchBar = document.querySelector('.searchBar');
const showEnterProducts = document.querySelector('.showEnterProducts');
showEnterProducts.style.display = 'none';

// fake store api call
let shopData;
    const apiURL = "https://fakestoreapi.com/products";
    fetch(apiURL).then(response =>{
        return response.json();
    }).then(data =>{
        shopData = data;
    })

resultContainer.innerHTML = '';
resultContainer.style.display = 'none';

let filterProducts = [];
// searchBar event 
searchBar.addEventListener('keyup',function (e) {
    showEnterProducts.style.display = 'none';
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter'){
        navigateAndSelectProduct(e.key);
        return;
    }
    const searchText = e.target.value.toLowerCase();
    resultContainer.innerHTML = '';
    
     filterProducts = shopData.filter(product => {
        return product.title.toLowerCase().includes(searchText);
    })
    if(searchText === ''){
        return;
    }
    const hasProductToShow = filterProducts.length > 0;
    if(hasProductToShow){
       
        //loop filter products data and show
        for (let i = 0; i < filterProducts.length; i++) {
            const productItemContainer = document.createElement('div');
            productItemContainer.id = filterProducts[i].id;
            productItemContainer.classList.add('productItemContainer');

            const productName = document.createElement('div');
            productName.classList.add('productName');
            productName.append(filterProducts[i].title);

            const productImage = document.createElement('img');
            productImage.classList.add('productImage');
            productImage.src = filterProducts[i].image;

            productItemContainer.append(productName,productImage);
            resultContainer.append(productItemContainer);
            resultContainer.style.display = 'block';
        }
    }
})

let indexToSelect = -1;

// keyboard funciton event
const navigateAndSelectProduct = (key) =>{

    if(key === 'ArrowDown'){
        indexToSelect += 1;
        if(indexToSelect === filterProducts.length ){
            indexToSelect = -1;
            deselected();
            return;
        };
        selected(indexToSelect);
        if(indexToSelect > 0){
            deselected();
        }
        
        
    }else if(key === 'ArrowUp'){
        if(indexToSelect === 0){
            indexToSelect = filterProducts.length-1;
            deselected();
            selected(indexToSelect);
            return;
        }        
        indexToSelect -= 1;

        deselected();
        selected(indexToSelect);
        
    }else{
        const enteredProduct = selectProduct(indexToSelect);
    }
}
// enter product 
const selectProduct = (index) =>{
    showEnterProducts.innerHTML = "";
    const productIdToSelect = filterProducts[index].id.toString();
    const productItemContainerToSelect = document.getElementById(
        productIdToSelect
    );
    resultContainer.style.display ='none';
    showEnterProducts.style.display = 'block';

    const showProductName = document.createElement('div');
    showProductName.classList.add('showProductName');//product name 

    const showProductPrice = document.createElement('div');
    showProductPrice.classList.add('showProductPrice'); //product price

    const showProductDescription = document.createElement('div');
    showProductDescription.classList.add('showProductDescription'); //product description

    const showProductRating= document.createElement('div');
    showProductRating.classList.add('showProductRating'); // rating

    const showProductImage = document.createElement('img');
    showProductImage.classList.add('showProductImage'); // image

    showEnterProducts.append(showProductName,showProductDescription,showProductPrice,showProductRating,showProductImage); //append

    showProductImage.src = filterProducts[index].image;
    showProductName.textContent = filterProducts[index].title;
    showProductDescription.textContent =  filterProducts[index].description;
    showProductPrice.textContent = "Price"+ " - " + filterProducts[index].price+'$' ; 
    showProductRating.textContent = "Rating"+ " - " + filterProducts[index].rating.rate  ;
}

//deselect item
const deselected = () =>{
    const productItemContainerToDeselect = document.querySelector('.selected');

    productItemContainerToDeselect.classList.remove('selected');
}

//select item
const selected =(indexToSelect) =>{
    const productIdToSelect = filterProducts[indexToSelect].id.toString();
    const productItemContainerToSelect = document.getElementById(
        productIdToSelect
    );
    productItemContainerToSelect.classList.add('selected');
}