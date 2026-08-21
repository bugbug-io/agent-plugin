# Typical Ecommerce E2E Scenarios

Use this as a scenario catalog. Start with `## Contents`, then read only the
sections that match the requested commerce flow.

## Contents

- [1. Store entry and navigation](#1-store-entry-and-navigation)
- [2. Product discovery](#2-product-discovery)
- [3. Product detail page](#3-product-detail-page)
- [4. Product variant selection](#4-product-variant-selection)
- [5. Wishlist and saved items](#5-wishlist-and-saved-items)
- [6. Cart management](#6-cart-management)
- [7. Cart persistence](#7-cart-persistence)
- [8. Promotions and discounts](#8-promotions-and-discounts)
- [9. Guest checkout](#9-guest-checkout)
- [10. Registered customer checkout](#10-registered-customer-checkout)
- [11. Shipping and delivery](#11-shipping-and-delivery)
- [12. Tax, duties, and regional pricing](#12-tax-duties-and-regional-pricing)
- [13. Payment](#13-payment)
- [14. Order creation and confirmation](#14-order-creation-and-confirmation)
- [15. Inventory handling](#15-inventory-handling)
- [16. Order tracking and fulfilment](#16-order-tracking-and-fulfilment)
- [17. Order history and account area](#17-order-history-and-account-area)
- [18. Order cancellation](#18-order-cancellation)
- [19. Returns and exchanges](#19-returns-and-exchanges)
- [20. Refunds](#20-refunds)
- [21. Customer account management](#21-customer-account-management)
- [22. Loyalty and rewards](#22-loyalty-and-rewards)
- [23. Gift cards and store credit](#23-gift-cards-and-store-credit)
- [24. Product subscriptions](#24-product-subscriptions)
- [25. Localization and international shopping](#25-localization-and-international-shopping)
- [26. Mobile ecommerce journeys](#26-mobile-ecommerce-journeys)
- [27. Abandoned cart and checkout recovery](#27-abandoned-cart-and-checkout-recovery)
- [28. Notifications and customer communication](#28-notifications-and-customer-communication)
- [29. Reviews and ratings](#29-reviews-and-ratings)
- [30. Customer support journeys](#30-customer-support-journeys)
- [31. Marketplace ecommerce scenarios](#31-marketplace-ecommerce-scenarios)
- [32. B2B ecommerce scenarios](#32-b2b-ecommerce-scenarios)
- [33. Security and privacy from the customer perspective](#33-security-and-privacy-from-the-customer-perspective)
- [34. Reliability and recovery](#34-reliability-and-recovery)
- [Recommended Ecommerce Smoke Suite](#recommended-ecommerce-smoke-suite)
- [Critical Regression Suite](#critical-regression-suite)
- [Useful Ecommerce Test Matrix](#useful-ecommerce-test-matrix)

For ecommerce platforms, organize E2E coverage around the **customer lifecycle**: discovery, product selection, purchase, fulfilment, post-purchase service, and retention.

## 1. Store entry and navigation

Typical paths:

* Homepage → category → product
* Promotional landing page → collection → product
* Search engine link → product page
* Email campaign → promotional page
* Social media link → product or collection
* Direct product link
* Main menu → subcategory
* Footer link → informational page

Test:

* Desktop and mobile navigation
* Browser back and forward
* Deep links
* Broken or expired campaign links
* Removed product or category
* Regional redirects
* Returning visitor landing state
* Cookie and consent banner behavior

Key checks:

* The customer reaches the expected destination
* Navigation remains usable on all devices
* Campaign parameters are preserved where required
* Invalid links provide a useful recovery path
* No redirect loops occur

---

## 2. Product discovery

Typical paths:

* Browse a category
* Browse a collection
* Search for a product
* Use autocomplete suggestions
* Apply filters
* Sort results
* Open a recommended product
* Open a recently viewed product
* Compare products
* Browse related products

Test:

* Exact product search
* Partial search term
* Misspelled term
* Search by SKU
* Search with no results
* Single and multiple filters
* Clear filters
* Pagination or infinite scrolling
* Return from product page to results
* Share a filtered URL

Important checks:

* Search results are relevant
* Filters and sorting remain applied
* Result counts are accurate
* Restricted or unavailable products are handled correctly
* Browser back restores the previous position
* Search results respect region and customer eligibility

---

## 3. Product detail page

Typical customer path:

* Product listing → product details → select options → add to cart

Test:

* In-stock product
* Out-of-stock product
* Low-stock product
* Product with one variant
* Product with multiple variants
* Required options
* Optional add-ons
* Personalized product
* Digital product
* Gift card
* Subscription product
* Bundled product
* Preorder product
* Product with regional restrictions

Key checks:

* Product name, description, price, images, and availability are correct
* Variant selection updates price and stock
* Required selections are enforced
* Product images and video work
* Delivery information is visible
* Promotions are represented correctly
* Add-to-cart controls reflect availability

---

## 4. Product variant selection

Test:

* Select size
* Select color
* Select material
* Select quantity
* Switch between variants
* Select an unavailable combination
* Add a configurable product without selecting required options
* Open a preselected variant using a direct URL
* Return to a previously selected variant

Failure cases:

* Variant becomes unavailable during selection
* Variant price fails to load
* Variant image does not update
* Invalid option combination
* Variant is available in one location but not another

Expected behavior:

* The correct SKU, price, image, and stock state are shown
* Invalid combinations cannot be purchased
* The customer receives clear validation
* Selection remains consistent when added to the cart

---

## 5. Wishlist and saved items

Test:

* Add product to wishlist
* Remove product from wishlist
* Add the same product twice
* Move product from wishlist to cart
* Save product as a guest
* Log in and retain saved products
* Share wishlist
* Open wishlist on another device
* Purchase a saved product
* View an unavailable saved product

Key checks:

* Duplicate entries are prevented
* Correct variants are preserved
* Removed or unavailable products are handled clearly
* Wishlist state is synchronized for logged-in users
* Guest wishlist behavior follows the expected rules

---

## 6. Cart management

Typical paths:

* Add product to cart
* Add multiple products
* Open mini-cart or cart drawer
* Open full cart page
* Update quantity
* Remove item
* Continue shopping
* Return to cart
* Save item for later

Test:

* Simple product
* Variant product
* Multiple quantities
* Multiple product types
* Promotional product
* Free gift
* Subscription product
* Digital and physical products together

Important checks:

* Correct product and variant appear
* Quantity and line totals are correct
* Subtotal updates correctly
* Cart count is accurate
* Product options remain visible
* Removed items no longer affect totals
* Empty-cart state is useful

---

## 7. Cart persistence

Test:

* Refresh the page
* Navigate to another page
* Close and reopen the browser
* Return after several hours or days
* Open the cart in another tab
* Log in after adding products as a guest
* Log out and log back in
* Open the account on another device

Key risks:

* Cart is lost unexpectedly
* Guest and registered carts duplicate products
* Old prices remain in the cart
* Unavailable products remain purchasable
* Cart contents differ between tabs
* Region changes produce invalid cart items

Expected behavior:

* Cart contents persist according to business rules
* Cart merges safely after login
* Prices and stock are revalidated
* No unintended duplicate items are created

---

## 8. Promotions and discounts

Test:

* Apply valid discount code
* Apply invalid code
* Apply expired code
* Apply code below minimum spend
* Apply customer-specific code
* Apply product-specific code
* Apply first-order discount
* Apply automatic promotion
* Remove discount
* Combine discounts
* Apply free-shipping promotion
* Add a free gift
* Reach a promotional threshold
* Drop below the threshold after removing an item

Key checks:

* Eligibility is enforced correctly
* Discount amount is accurate
* Promotion applies only to eligible products
* Exclusions are respected
* Removed promotions restore the correct total
* Error messages explain why a discount was rejected
* Promotion remains valid through checkout

---

## 9. Guest checkout

Typical path:

* Cart → checkout → contact information → delivery → payment → confirmation

Test:

* Guest checkout
* Checkout with email only
* Checkout with phone number
* Billing same as shipping
* Billing different from shipping
* Domestic address
* International address
* Digital-only order
* Physical-only order
* Mixed order
* Store pickup
* Local delivery

Failure paths:

* Invalid email
* Invalid phone number
* Missing address fields
* Invalid postcode
* Unsupported delivery country
* Address validation warning
* Session expires during checkout
* Product becomes unavailable

Key checks:

* Guest users are not forced to create an account unless required
* Order totals remain consistent
* Form validation is clear
* Previously entered information is preserved after recoverable errors
* The customer can safely resume checkout

---

## 10. Registered customer checkout

Test:

* Login before checkout
* Login during checkout
* Use saved address
* Add a new address
* Edit address during checkout
* Select default address
* Use saved payment method
* Add a new payment method
* Apply loyalty points
* Apply store credit
* Complete checkout
* View the order in account history

Edge cases:

* Saved address is incomplete
* Saved card is expired
* Account session expires
* Customer has multiple addresses
* Guest cart merges with account cart
* Customer belongs to a restricted group
* Customer pricing changes after login

---

## 11. Shipping and delivery

Test:

* Standard shipping
* Express shipping
* Free shipping
* Same-day delivery
* Local delivery
* Store pickup
* Delivery to a pickup point
* International shipping
* Split shipment
* Partial shipment
* Digital delivery

Failure and edge cases:

* Address is outside the service area
* Shipping method becomes unavailable
* Product cannot use the selected method
* Cart contains products from different warehouses
* Delivery estimate changes
* Free-shipping threshold is lost
* Store pickup location becomes unavailable

Key checks:

* Eligible shipping methods are displayed
* Shipping prices are accurate
* Delivery estimates are clear
* Restricted methods are not selectable
* Shipping totals update immediately
* Selected method remains applied through payment

---

## 12. Tax, duties, and regional pricing

Test:

* Domestic tax
* International tax
* Tax-exempt customer
* VAT-inclusive pricing
* VAT-exclusive pricing
* Business tax ID
* Duties prepaid
* Duties payable on delivery
* Regional price list
* Currency change
* Country change

Important checks:

* Tax is calculated using the correct address
* Displayed prices follow regional rules
* Tax changes correctly when the address changes
* Currency remains consistent
* Duties and additional charges are disclosed
* Invoice tax details are correct
* The final charge matches the checkout total

---

## 13. Payment

Core payment scenarios:

* Successful card payment
* Declined card
* Expired card
* Incorrect card details
* Insufficient funds
* Card authentication required
* 3D Secure success
* 3D Secure failure
* 3D Secure cancellation
* Digital wallet payment
* PayPal or redirect payment
* Buy-now-pay-later
* Bank transfer
* Cash on delivery
* Gift card
* Store credit
* Split payment

Failure scenarios:

* Payment provider unavailable
* Payment times out
* Customer closes the payment window
* Customer returns using browser back
* Payment succeeds but confirmation is delayed
* Payment fails after order creation
* Customer retries payment
* Customer clicks pay repeatedly

Critical checks:

* Only one payment is captured
* Only one order is created
* Failed payments are not shown as successful
* Successful payments are not shown as failed
* Cart and inventory reach the correct final state
* The customer receives a clear next step

---

## 14. Order creation and confirmation

Test:

* Successful checkout
* Confirmation page
* Confirmation email
* SMS confirmation
* Order-status page
* Order appears in account history
* Guest opens order using a secure link
* Customer refreshes confirmation page
* Customer uses browser back after payment

Key checks:

* Order number is unique
* Products, quantities, and variants are correct
* Payment status is accurate
* Shipping address is correct
* Tax, shipping, discount, and total match checkout
* Confirmation is not duplicated
* Sensitive payment information is not exposed

---

## 15. Inventory handling

Test:

* Purchase in-stock product
* Purchase final available unit
* Product becomes unavailable in cart
* Product becomes unavailable during checkout
* Quantity exceeds stock
* Backordered product
* Preorder product
* Product stocked across multiple locations
* Inventory restored after cancellation
* Inventory restored after failed payment where appropriate

Key risks:

* Overselling
* Stock deducted twice
* Stock not restored
* Customer pays for unavailable product
* Different stock status shown across pages
* Cart does not revalidate inventory

---

## 16. Order tracking and fulfilment

Typical path:

* Order confirmation → shipment notification → tracking page → delivery

Test:

* Order processing
* Order shipped
* Multiple packages
* Partial shipment
* Tracking link
* Delayed shipment
* Failed delivery
* Delivered order
* Store pickup ready
* Digital product delivered

Key checks:

* Status changes are accurate
* Tracking links open the correct shipment
* Notifications are sent to the correct customer
* Partial shipments identify which items were sent
* Delivered status is reflected in the account
* Digital access is granted only after the correct payment state

---

## 17. Order history and account area

Test:

* View all orders
* Open order details
* Filter orders
* View current order
* View historical order
* Download invoice
* Reorder
* Track shipment
* Start return
* Cancel eligible order
* Contact support about an order

Important checks:

* Customers see only their own orders
* Order status is current
* Product and pricing history remain accurate
* Reorder handles discontinued or changed products
* Guest orders can be linked to an account where supported

---

## 18. Order cancellation

Test:

* Cancel before payment capture
* Cancel before fulfilment
* Cancel one item
* Cancel entire order
* Attempt cancellation after shipment
* Admin cancels order
* Customer cancels order
* Cancellation with a promotion
* Cancellation of a gift card order

Key checks:

* Cancellation eligibility is clear
* Payment is voided or refunded correctly
* Inventory is restored where appropriate
* Notifications are sent
* Order status changes correctly
* Uncancelled items remain active

---

## 19. Returns and exchanges

Typical paths:

* Order history → select item → choose reason → return method → confirmation

Test:

* Return one item
* Return multiple items
* Partial return
* Full return
* Exchange size or color
* Return damaged product
* Return gift
* Return promotional product
* Return product purchased with a discount
* Return after partial shipment
* Return outside the allowed window

Key checks:

* Only eligible items can be returned
* Refund amount is calculated correctly
* Shipping and restocking rules are applied
* Return label or instructions are generated
* Exchange inventory is reserved where appropriate
* Return status is visible to the customer

---

## 20. Refunds

Test:

* Full refund
* Partial refund
* Refund one product
* Refund shipping
* Refund tax
* Refund to original payment method
* Refund to store credit
* Refund gift card payment
* Refund split payment
* Refund after return
* Refund without return

Critical checks:

* Refund amount is correct
* Refund is not processed twice
* Order status reflects the refund
* Customer receives confirmation
* Payment provider and commerce platform remain synchronized
* Store credit and loyalty balances update correctly

---

## 21. Customer account management

Test:

* Register
* Verify email
* Login
* Logout
* Reset password
* Change password
* Change email
* Edit profile
* Add address
* Edit address
* Delete address
* Set default address
* Manage communication preferences
* Delete account

Failure paths:

* Duplicate email
* Invalid reset link
* Expired verification link
* Incorrect password
* Suspended account
* Account deleted during an active order
* Email change conflicts with another account

---

## 22. Loyalty and rewards

Test:

* Earn points from purchase
* View points balance
* Redeem points
* Combine points with discount
* Reach loyalty tier
* Lose tier eligibility
* Points reversed after refund
* Points expire
* Referral reward
* Birthday reward
* Member-only product or price

Key checks:

* Points are calculated correctly
* Points are not awarded twice
* Refunds adjust rewards correctly
* Eligibility follows customer status
* Loyalty balance remains consistent across channels

---

## 23. Gift cards and store credit

Test:

* Purchase gift card
* Deliver gift card by email
* Redeem full gift card balance
* Redeem partial balance
* Combine gift card with another payment
* Use expired or invalid gift card
* Refund to gift card
* Check gift card balance
* Use store credit
* Use store credit after return

Important checks:

* Balance updates correctly
* Gift card codes are unique
* Gift card cannot be redeemed beyond its balance
* Refunds restore the expected balance
* Sensitive gift card details are protected

---

## 24. Product subscriptions

Test:

* Subscribe to a product
* Choose delivery frequency
* Start with a discount
* Change delivery date
* Skip shipment
* Pause subscription
* Resume subscription
* Change quantity
* Change product variant
* Update address
* Update payment method
* Cancel subscription
* Reactivate subscription

Payment failure scenarios:

* Renewal card declined
* Card expired
* Retry succeeds
* Grace period expires
* Subscription is paused automatically
* Customer updates payment information

Key checks:

* Recurring orders are created once
* Correct price and discount are applied
* Subscription changes affect the correct future order
* Customer notifications are accurate
* Cancelled subscriptions do not renew

---

## 25. Localization and international shopping

Test:

* Change country
* Change language
* Change currency
* Browse regional catalog
* View regional availability
* Use localized payment method
* Enter international address
* Select international shipping
* View duties and tax
* Complete international checkout

Important checks:

* Language and currency remain selected
* Prices remain consistent
* Cart is revalidated after region changes
* Unavailable products are removed or explained
* Local formatting is correct
* Confirmation and emails use the selected language

---

## 26. Mobile ecommerce journeys

Test complete user paths on mobile:

* Mobile homepage → search → product → cart → checkout
* Open promotional link from social media
* Apply filters in a mobile drawer
* Select variants
* Use address autocomplete
* Use wallet payment
* Return from a payment application
* Open confirmation email
* Track order
* Start return

Common mobile risks:

* Keyboard covers inputs
* Checkout button is hidden
* Sticky elements overlap content
* Cart drawer cannot be closed
* Filters lose selections
* Payment redirect does not return
* Customer loses checkout state after switching apps

---

## 27. Abandoned cart and checkout recovery

Test:

* Add product and leave
* Start checkout and leave
* Receive recovery email
* Open recovery link
* Restore cart
* Complete checkout
* Use recovery link after product price changes
* Use recovery link after product becomes unavailable
* Use recovery link after purchase is already completed
* Unsubscribe from recovery emails

Key checks:

* Correct cart is restored
* Cart is revalidated
* Recovery link does not create duplicates
* Discount rules remain accurate
* Customer preferences are respected

---

## 28. Notifications and customer communication

Cover:

* Order confirmation email
* Payment failure email
* Shipment email
* Delivery email
* Pickup-ready notification
* Cancellation email
* Refund email
* Return-status email
* Back-in-stock notification
* Price-drop notification
* Abandoned-cart email

Test:

* Correct recipient
* Correct order and product details
* Links open the correct page
* Localized content
* No duplicate messages
* Unsubscribe preferences
* Failed delivery handling

---

## 29. Reviews and ratings

Test:

* Submit product review
* Submit rating
* Upload review image
* Edit review
* Delete review
* Verified purchase badge
* Review moderation
* Report review
* Sort and filter reviews
* Review request email

Key checks:

* Only eligible customers can submit verified reviews
* Duplicate reviews follow the expected rule
* Moderation status is clear
* Uploaded content is displayed correctly
* Review data does not expose customer information

---

## 30. Customer support journeys

Test:

* Open help centre
* Search support content
* Contact support
* Start live chat
* Submit order-related request
* Open support ticket
* Attach file
* Receive response
* Reply to ticket
* Escalate issue
* Close request

Important checks:

* Order context is included correctly
* Customer identity is verified where necessary
* Support links open the correct channel
* Attachments upload safely
* Customer receives confirmation and updates

---

## 31. Marketplace ecommerce scenarios

For marketplaces, test buyer and seller journeys.

Buyer paths:

* Browse seller products
* View seller profile
* Purchase from one seller
* Purchase from multiple sellers
* Contact seller
* Track separate shipments
* Return one seller’s item
* Raise dispute
* Leave seller review

Seller paths:

* Register as seller
* Complete verification
* Create listing
* Update inventory
* Receive order
* Fulfil order
* Cancel item
* Manage return
* Receive payout

Platform checks:

* Commission calculation
* Split payments
* Seller-specific shipping
* Refund allocation
* Seller suspension
* Removed listing
* Dispute workflow

---

## 32. B2B ecommerce scenarios

Test:

* Business account registration
* Company approval
* Multiple buyers under one company
* Buyer roles
* Purchase limits
* Quote request
* Quote approval
* Contract pricing
* Bulk ordering
* Reorder from previous order
* Purchase order payment
* Credit limit
* Approval workflow
* Tax-exempt purchase
* Account-specific catalog

Key checks:

* Company pricing is correct
* Approval rules are enforced
* Buyers see only permitted products
* Credit and payment terms are applied
* Orders remain associated with the correct business account

---

## 33. Security and privacy from the customer perspective

Test:

* Customer views own account
* Customer attempts to view another order by changing the URL
* Guest order link is protected
* Saved payment details are masked
* Logout invalidates sensitive pages
* Removed user loses access
* Account deletion removes access
* Consent preferences are respected
* Data export contains only the customer’s data

High-risk negative scenarios:

* Access another customer’s cart
* Access another customer’s address
* Reuse another customer’s order-status link
* Apply a restricted discount
* Change product price through a request
* Reuse a completed payment callback

---

## 34. Reliability and recovery

Test realistic interruptions:

* Refresh during checkout
* Lose network during payment
* Close browser after submitting payment
* Session expires during checkout
* Open checkout in multiple tabs
* Submit order repeatedly
* Use browser back after payment
* Payment provider responds slowly
* Inventory changes during checkout
* Promotion expires during checkout
* Shipping method disappears
* Cart API fails temporarily

Expected behavior:

* No duplicate orders
* No duplicate charges
* No unintended stock reduction
* Entered information is preserved where safe
* Customer can retry safely
* Final order status is unambiguous
* Errors provide a clear recovery action

---

# Recommended Ecommerce Smoke Suite

Run after every deployment:

1. Open the storefront.
2. Browse a category.
3. Search for a product.
4. Open a product page.
5. Select a variant.
6. Add the product to cart.
7. Update cart quantity.
8. Apply a discount.
9. Complete guest checkout.
10. Complete a successful payment.
11. Verify the confirmation page.
12. Verify the order appears in the account or order-status page.
13. Verify the confirmation email.
14. Complete the main mobile purchase journey.

---

# Critical Regression Suite

Before major releases, include:

* Product search and filtering
* Product variants and stock
* Guest checkout
* Registered checkout
* Cart persistence
* Guest-to-account cart merge
* Discounts and promotions
* Shipping methods
* Tax calculation
* Successful payment
* Declined payment and retry
* Redirect payment
* Duplicate-payment prevention
* Order confirmation
* Order cancellation
* Refund
* Return
* Mobile checkout
* Regional checkout
* Inventory changes during checkout
* Session expiry and recovery

---

# Useful Ecommerce Test Matrix

| Dimension      | Examples                                          |
| -------------- | ------------------------------------------------- |
| Customer state | Guest, registered, loyalty member, business buyer |
| Product type   | Simple, variant, bundle, digital, subscription    |
| Stock state    | In stock, low stock, out of stock, preorder       |
| Cart state     | Empty, single item, multiple items, saved cart    |
| Promotion      | None, coupon, automatic discount, free gift       |
| Delivery       | Standard, express, pickup, digital                |
| Payment        | Card, wallet, redirect, gift card, failed         |
| Region         | Country, language, currency, tax region           |
| Order state    | New, paid, shipped, delivered, cancelled          |
| Device         | Desktop, mobile, tablet                           |
| Session        | Active, expired, multiple tabs                    |
| Network        | Normal, slow, interrupted                         |
| Outcome        | Success, validation failure, system failure       |

The strongest ecommerce E2E suite answers one main question:

**Can a customer discover the right product, purchase it at the correct price, receive it successfully, and resolve any post-purchase issue without losing money, data, or trust?**
