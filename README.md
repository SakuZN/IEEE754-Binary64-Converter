# IEEE-754 Binary 64 Converter
This project provides a straightforward web-based tool designed to convert decimal and binary mantissa inputs to IEEE754 binary64 (double-precision) floating-point numbers. It handles special cases such as NaN (SNaN and QNaN), Infinity, and denormalized numbers, providing comprehensive coverage of the IEEE-754 standard.

![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/89b260ad-bd70-4b7f-9168-b4580803d4d0)

<p align="center">
  Link to the website: https://ieee-754-binary64-converter.vercel.app/
</p>

# Project Video Showcase
https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/0653c405-ecc9-49ce-b516-a880155914da

# Writeup Analysis and Code Implementation
For a more detailed explanation of the project, check the analysis paper here:
[CSARCH2 S14 G7 | Analysis Writeup](https://drive.google.com/file/d/1pS35DYscoKE9dhumqqQ7IaV5cNb51ZZA/view?usp=sharing)

Interested in the code implementation? Check the code here: [Conversion Algorithms](https://github.com/SakuZN/IEEE754-Binary64-Converter/blob/master/src/lib/conversion_algorithms.ts)

# Test Cases
## Decimal Input
### Input: $\ 65.0 x 10^3$ Standard Positive Number
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/0e6b4946-745c-4edd-84fe-8f8a6de11e7c)

### Input: $\ 1.0 x 10^3$ Small Positive Number
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/fa348cd9-5aaf-4629-8eae-c434a014df7e)

### Input: $\ -1.0 x 10^3$ Small Negative Number
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/224c1183-4354-4132-a5c9-da38b4cab424)

### Input: $\ -65.0 x 10^3$ Standard Negative Number
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/5f3c49eb-3f7f-4f70-a81d-b77857866bbd)

### Input: $\ 0 x 10^0$ Special Case: Zero
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/86375f9e-20ca-41b1-8dc3-87699c4a59e2)

### Input: $\ -1.0 x 10^323$ Special Case: Infinity
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/4a68e842-3ebf-4539-960b-20897b38f367)

### Input: $\ 1.0 x 10^-323$ Special Case: Denormalized
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/dde913a6-ddd0-429b-99e4-a8cccb59cb77)

### Input: $\ QNaN$ Special Case: NaN
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/c8a4552f-e38f-4725-a600-50bc1b8cdea8)

### Input: $\ SNaN$ Special Case: NaN
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/aec36820-67ba-406a-8b7d-954bb9a5908b)

## Binary Mantissa Input
### Input: $\ 100.111 x 2^3$ Positive Binary with fraction
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/5a01855b-16c2-4176-8658-ba4ffce1f8cb)


### Input: $\ 101 x 2^3$ Small Positive Binary
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/828e97f0-0318-401f-a828-7b4eb9656b19)


### Input: $\ -101 x 2^3$ Small Negative Binary
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/86e0233e-87e1-42bf-b095-3d7021f2affc)


### Input: $\ -100.111 x 2^3$ Negative Binary with fraction
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/2562aa55-70ff-4bed-8b5f-4a2e1a0fd5cf)


### Input: $\ 0 x 2^0$ Special Case: Zero
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/076c841d-2648-4d07-96f4-79f3f0fa0c10)


### Input: $\ 101 x 2^1048$ Special Case: Infinity
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/caf1e4da-557e-42fe-957f-893d70ffa4e7)


### Input: $\ -1.1110 x 2^-1026$ Special Case: Denormalized
![image](https://github.com/SakuZN/IEEE754-Binary64-Converter/assets/106810417/7cd55061-c5d2-4943-9c4f-4e38e29767c7)


