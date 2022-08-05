# common

This library was that will be common for both sqModule and the graphQL module

## **Patterns**

-   Used DI from the `Nest IoC` container framework
-   Used singleton pattern with scope `DEFAULT`
-   Decorator pattern for logging - made use of proxy and aop like cross cutting feature that we see in springboot
-   Used builder pattern just as a sample to build custom error model. Not a valid use case here

## **Logging**

-   We use pino async logging with decorator pattern . Note for aws lambdas we have to flush at the end of function call - ur lambda handler, else we will def loose data

## Running unit tests

Run `nx test common` to execute the unit tests via [Jest](https://jestjs.io).
