# E-Commerce

This is a front-end application developed using React to work with [CommerceJS](https://commercejs.com/ "CommerceJS API"), an API where you can create your own store and publish your items, categories, discounts and more using their system. This application fetches all this data using a key provided by CommerceJS and displays it in the page, allowing the customers to purchase these products.

![Captura de tela de 2021-12-10 22-39-14](https://user-images.githubusercontent.com/42102027/145660166-ab8d1dee-b53f-459a-9dda-86978eb9924c.png)

## Categories

When the customers first loads the page, an asynchronous request is performed to fetch all the categories created in the API.


![Captura de tela de 2021-12-10 22-50-16](https://user-images.githubusercontent.com/42102027/145660232-0fde9ddc-4d14-43c1-a8ce-c48452286852.png)

"getCategories()" is a function comming from "GlobalContext" which is a ContextAPI component who contains most of the asynchronous request functions organized in it. The function getCategories fetches the categories comming from the API and filter them allowing only those that contain one or more product to be shown. It also organizes the array so the categories with more products are shown first in the navigation menu.

![Captura de tela de 2021-12-10 22-51-05](https://user-images.githubusercontent.com/42102027/145660369-817d1ba8-2526-4964-8948-b033b844602c.png)

If your store have too many categories, the categories with less items will be shown in a dropdown menu at the end of the navbar. This is so that the navbar doesn't get too polluted, and also so that there are no overflow issues.

![Captura de tela de 2021-12-10 23-16-16](https://user-images.githubusercontent.com/42102027/145660525-cd14e9b8-99ae-4eaf-b172-fa44a8cde227.png)

Of course the behavior is different in mobile dispositives. The customers can open a side-menu with all the categories displayed in it.


![Captura de tela de 2021-12-10 23-20-58](https://user-images.githubusercontent.com/42102027/145660650-78db393a-29ba-4f43-8642-819ebde82238.png)

## Products

All the products published in the API will be loaded when the customers loads the page for the first time and shown in the home page, as demonstrated in the first image of this document.

![Captura de tela de 2021-12-10 23-34-06](https://user-images.githubusercontent.com/42102027/145660972-4678535e-c102-40de-b8fd-6d18328e8b02.png)

products that belong to a specific category will be displayed when entering that category page.

![Captura de tela de 2021-12-10 23-30-08](https://user-images.githubusercontent.com/42102027/145660871-fb846689-6be9-4e4e-af6d-7cb0bdf6ae9d.png)

The customers can add products they are interested in directly from this product's grid to the cart. They can also visit each product's specific page and check other details, like description, images and available quantity. Desirable amount of products can also be defined here. 

![Captura de tela de 2021-12-10 23-41-57](https://user-images.githubusercontent.com/42102027/145661131-03aab74e-8bd7-41a6-94bc-fa30875997c1.png)

## Cart

When the customers first loads the website, a cart will be retrieved from the API, it can be a empty cart if the user never visited the site before, or a cart fulfilled with some items that were added there before. The API tracks the cart's content using a cookie, you can check more info about how that works in the [API's docs.](https://commercejs.com/docs/sdk/cart "in the API's docs.")


![Captura de tela de 2021-12-10 23-45-19](https://user-images.githubusercontent.com/42102027/145661380-9d3b408d-a6ad-4d04-b51f-3484989e7966.png)

The customers can view, remove and alter the quantity of each product they added to the cart. The cart informs the prices of each choosen product and the total price. If the customers have a promo discount code, they can type them here, the code will be stored in a state inside the "GlobalContext" and and validity will be checked at checkout.

![Captura de tela de 2021-12-11 00-05-09](https://user-images.githubusercontent.com/42102027/145661839-afcf0ac2-9a1e-4467-9785-8b646453f1be.png)

## Checkout

When the customers arrive at checkout, a checkout token will be generated containing most of the information on the purchase. This token will be used on most of the checkout operations.

![Captura de tela de 2021-12-11 00-15-44](https://user-images.githubusercontent.com/42102027/145661917-5a564f6b-c607-4390-8287-0ab9890ca23b.png)

The first step is collect the customer's basic data, such as name, email, address, address code, country, city and shipping method. The "AddressForm" file will  fetch all the countries previously registred in the API to a select, another select will be fulfilled with the subdivions of the choosen shipping country and so will the shipping method.

![Captura de tela de 2021-12-11 16-47-58](https://user-images.githubusercontent.com/42102027/145689700-6c641cce-9720-4960-9f90-0f877ceaa285.png)

The next step is the payment form, where the customer can review his purchase and inform the credit card. When the customer enters this step, the shipping method will be fetched to the API and so will the discount code as well, if informed before. The price with the shipping and the discount will be calculated by the API and displayed to the user so the purchase can be concluded.

![Captura de tela de 2021-12-11 16-54-34](https://user-images.githubusercontent.com/42102027/145689839-118c035a-583e-4cd3-acd5-7aa34de9237d.png)

A final object containing all the information about the purchase, including customer's information, purchase informations and paymenthod details will be fetched to the API, then an email with all the details will be sent to the store owner and to the customer.

![Captura de tela de 2021-12-11 16-57-27](https://user-images.githubusercontent.com/42102027/145689905-4bb3c657-8bc9-4714-b8f0-14f59c50e5c8.png)

## Conclusion

You can experience how the website works by yourself and check all of it's freatures through a demo version that i've uploaded in netlify: https://gabrieln-ecommerce.netlify.app/

This version is only a test demo and the purchase can't be completed once a test variable is set to true.

![Captura de tela de 2021-12-11 19-34-48](https://user-images.githubusercontent.com/42102027/145693644-6022cc52-d30d-4235-9327-ec5693433244.png)

Finally, i would like to recommend [JavaScript Mastery video](https://www.youtube.com/watch?v=377AQ0y6LPA "JavaScript Mastery's video") which I took inspiration and instruction to develop this site. 
