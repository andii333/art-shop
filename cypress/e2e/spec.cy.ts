describe('homepage', () => {

  it('should render components', () => {
    cy.visit("/")
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="main"]').should('be.visible');
    cy.get('[data-cy="footer"]').should('be.visible');
    cy.get('[data-cy="bestsellers"]').should('be.visible');
    cy.get('[data-cy="mostPopular"]').should('be.visible');
    cy.get('[data-cy="topRanking"]').should('be.visible');
    cy.get('[data-cy="chatWithUs"]').should('be.visible')
    cy.get('[data-cy="blog"]').should('be.visible')
    cy.get('[data-cy="aboutUs"]').should('be.visible')
    cy.get('[data-cy="careers"]').should('be.visible')
    cy.get('[data-cy="logo"]').should('be.visible')
    cy.get('[data-cy="search"]').should('be.visible')
    cy.get('[data-cy="goToBasket"]').should('be.visible')
    cy.get('[data-cy="categorySelect"]').should('be.visible')
    cy.get('[data-cy="painting"]').should('be.visible')
    cy.get('[data-cy="openPainting"]').should('be.visible')
    cy.get('[data-cy="sendPaintingToBasket"]').should('be.visible')
    cy.get('[data-cy="getInTouch"]').should('be.visible')
    cy.get('[data-cy="getInTouch"]').should('be.visible')
    cy.get('[data-cy="abstractExpressionism"]').should('be.visible')
  })
  it('should render components blog', () => {
    cy.visit("/")
    cy.get('[data-cy="blog"]').click()
    cy.get('[data-cy="blogContainer"]').should('be.visible')
  })
  it('should render components about-us', () => {
    cy.visit("/")
    cy.get('[data-cy="aboutUs"]').click()
    cy.get('[data-cy="aboutUsContainer"]').should('be.visible')
  })
  it('should render components careers', () => {
    cy.visit("/")
    cy.get('[data-cy="careers"]').click()
    cy.get('[data-cy="careersContainer"]').should('be.visible')
  })
  it('should render components checkout', () => {
    cy.visit("/")
    cy.get('[data-cy="goToBasket"]').click()
    cy.get('[data-cy="basketContainer"]').should('be.visible')
    cy.get('[data-cy="goToCheckout"]').click()
    cy.get('[data-cy="checkoutContainer"]').should('be.visible')
  })

  it('should add product to checkout and send order', () => {
    cy.visit("/")
    cy.get('[data-cy="countBasket"]').contains("0")
    cy.get('[data-cy="sendPaintingToBasket"]:first').click()
    cy.get('[data-cy="sendPaintingToBasket"]:first').should('be.disabled')
    cy.get('[data-cy="countBasket"]').contains('1')
    cy.get('[data-cy="goToBasket"]').click()
    cy.url().should('include', 'http://localhost:4200/basket')
    cy.get('[data-cy="basketContainer"]').should('be.visible')
    cy.get('[data-cy="elementInbasket"]').should('be.visible')
    cy.get('[data-cy="goToCheckout"]').click()
    cy.url().should('eq', 'http://localhost:4200/checkout')
    cy.get('[data-cy="checkoutContainer"]').should('be.visible')
    cy.get('[data-cy="firstName"]').type('Andrii')
    cy.get('[data-cy="lastName"]').type('Semer')
    cy.get('[data-cy="email"]').type('asd@asd')
    cy.get('[data-cy="phoneNumber"]').type('1234567891011')
    cy.get('[data-cy="address"]').type('Vilhova')
    cy.get('[data-cy="city"]').type('Lviv')
    cy.get('[data-cy="country"]').type('Ukraine')
    cy.get('[data-cy="zip"]').type('79039')
    cy.get('[data-cy="differentAddress"]').check()
    cy.get('[data-cy="fedex"]').check()
    cy.get('[data-cy="dhl"]').check()
    cy.get('[data-cy="cardNumber"]').type('1111222233334444')
    cy.get('[data-cy="cardHolder"]').type('asdfgh')
    cy.get('[data-cy="cardDate"]').type('112233')
    cy.get('[data-cy="cvc"]').type('123')
    cy.get('[data-cy="payPal"]').check()
    cy.get('[data-cy="bitcoin"]').check()
    cy.get('[data-cy="textarea"]').type('dasdhasuihhasklhkashklaskldjka')
    cy.get('[data-cy="noSpam"]').check()
    cy.get('[data-cy="sendOrder"]').should('be.disabled')
    cy.get('[data-cy="privacyPolicy"]').check()
    cy.get('[data-cy="sendOrder"]').should('be.enabled')
    cy.get('[data-cy="sendOrder"]').click()
    cy.url().should('eq', 'http://localhost:4200/homepage')
  })

  it('should render at least one product and go to category page', () => {
    cy.visit("/")
    cy.get('[data-cy="categorySelect"]:first').select('2')
    cy.get('[data-cy="painting"]').should('be.visible');
  cy.url().should('eq', 'http://localhost:4200/category/2')
  })
    
  it('should render one product page', () => {
    cy.visit("/")
    cy.get('[data-cy="openPainting"]:first').click()
    cy.url().should('include', 'http://localhost:4200/detail')
    cy.get('[data-cy="paintingWindow"]').should('be.visible');
  })

})

