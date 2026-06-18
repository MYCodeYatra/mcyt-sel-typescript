Feature: User Authentication

  As a registered user
  I want to be able to log in to my account
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given the user navigates to the MyCodeYatra login page
    When the user enters the username "admin" and password "password123"
    And clicks the login button
    Then the user should be redirected to the secure dashboard
