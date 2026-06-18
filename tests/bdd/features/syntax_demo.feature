Feature: E-Commerce Shopping Cart Validation
  In order to purchase items
  As a registered customer
  I want to be able to add products to my cart and check out

  Background: 
    Given the user is on the "MyCodeYatra Store" homepage
    And the user is logged in with valid credentials
    
  Scenario: Adding a single item to the cart
    When the user searches for "Selenium Masterclass Book"
    And the user clicks the "Add to Cart" button
    Then the cart badge should display "1"
    And the "Selenium Masterclass Book" should be visible in the cart summary
    But the "Checkout" button should remain disabled until terms are accepted

  Scenario: Attempting to checkout without accepting terms
    Given the cart contains 1 item
    When the user navigates to the "Checkout" page
    Then an error message "Please accept the Terms and Conditions" should be displayed
