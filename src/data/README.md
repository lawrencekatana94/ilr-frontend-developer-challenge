# Contract Dashboard Data Structure

This document provides an overview of the data structures used in the Contract Dashboard application. Understanding these data structures is essential for implementing the redesigned dashboard interface.

## Overview of Data Files

The application uses several JSON files to store different aspects of contract information:

1. `contract_detail_view.json` - Core contract information
2. `roles.json` - Information about people associated with the contract
3. `time_line.json` - Timeline of events related to the contract
4. `components.json` - Contract components and benefits
5. `transactions.json` - Financial transactions related to the contract
6. `status_history.json` - History of status changes
7. `movement_values.json` - Values associated with contract movements
8. `workflows.json` - Workflow information for the contract
9. `claims.json` - Claims information related to the contract

## Data Relationships

```
                  +----------------+
                  | contract_detail|
                  +----------------+
                          |
                          v
        +--------+--------+--------+--------+
        |        |        |        |        |
        v        v        v        v        v
  +-------+ +--------+ +-----+ +------+ +--------+
  | roles | | time_  | |compo-| |trans-| | status_|
  |       | | line   | |nents | |action| | history|
  +-------+ +--------+ +-----+ +------+ +--------+
                                |        |
                                v        v
                           +--------+ +--------+
                           |movement| | claims |
                           | values | |        |
                           +--------+ +--------+
                                         |
                                         v
                                    +--------+
                                    |workflows|
                                    +--------+
```

## Key Data Structures

### Contract Details (`contract_detail_view.json`)

The primary contract information containing:

- Contract number and status
- Product and campaign information
- Commencement and maturity dates
- Premium information
- Collection details
- Contract term and status

```json
{
  "ttContractDetailsView": [
    {
      "contractNumber": "12345678",
      "contractStatus": "In-Force",
      "productLabel": "Funeral Platinum",
      "campaignLabel": "Standard",
      "commencementDateFormatted": "2023/03/01",
      "actualRecurringCollection": "79.00",
      "collectionFrequency": "Monthly",
      "contractTerm": "Whole Life",
      "maturityDate": "N/A",
      // Additional fields...
    }
  ]
}
```

### Role Players (`roles.json`)

Information about people associated with the contract:

- Policy holder
- Life insured
- Beneficiaries
- Payers
- Other role players

```json
{
  "contractrolesview": {
    "ttContractRolesView": [
      {
        "entityName": "John Doe",
        "relationship": "Policy Holder",
        "roleDescription": "Main Member",
        "dependantCode": "0",
        "dateOfBirth": "1980/05/15",
        "idNumber": "8005155012345",
        "gender": "Male",
        "cellphone": "0821234567",
        "email": "john.doe@example.com",
        // Additional fields...
      },
      // Additional role players...
    ]
  }
}
```

### Timeline (`time_line.json`)

Chronological events related to the contract:

- Status changes
- Premium payments
- Policy amendments
- Communications
- Claims events

```json
{
  "Elements": [
    {
      "eventDate": "2023/03/01",
      "eventType": "New Business",
      "eventDescription": "Contract created",
      "eventStatus": "Completed",
      "eventCategory": "Administrative",
      // Additional fields...
    },
    // Additional events...
  ]
}
```

### Components (`components.json`)

Contract components and benefits information:

- Coverage details
- Benefit amounts
- Terms and conditions
- Premium allocations

```json
{
  "componentId": "7005",
  "componentDescription": "Funeral Platinum",
  "onMovement": "In-Force",
  "fromDate": "2023/03/01",
  "toDate": "",
  "term": "Whole Life",
  "premium": "79.00",
  "recurringBenefit": "0.00",
  "singleBenefit": "50000.00",
  // Additional fields...
}
```

### Transactions (`transactions.json`)

Financial transactions related to the contract:

- Premium payments
- Refunds
- Adjustments
- Claims payments

```json
{
  "transactionDate": "2023/04/01",
  "transactionType": "Premium Payment",
  "amount": "79.00",
  "paymentMethod": "Debit Order",
  "status": "Successful",
  "reference": "PMT12345678",
  // Additional fields...
}
```

## Data Usage Guidelines

When implementing the redesigned dashboard, consider the following guidelines:

1. **Data Transformation**: Transform raw JSON data into more usable formats before rendering
2. **Data Relationships**: Establish relationships between different data sources for comprehensive views
3. **Data Caching**: Implement caching for frequently accessed data to improve performance
4. **Error Handling**: Include robust error handling for missing or malformed data
5. **Data Filtering**: Implement filtering capabilities for large datasets
6. **Data Visualization**: Use appropriate visualization techniques for different data types

## Implementation Considerations

- Use TypeScript interfaces to define data structures for type safety
- Create utility functions for common data transformations
- Implement data fetching services with proper error handling
- Consider data normalization for complex relationships
- Use memoization for expensive data operations

## Next Steps

1. Review all JSON files to understand the complete data structure
2. Create TypeScript interfaces for each data structure
3. Implement data fetching and transformation services
4. Design components based on data requirements
5. Implement data visualization components 