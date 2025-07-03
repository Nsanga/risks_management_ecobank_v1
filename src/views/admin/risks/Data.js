const data = [
  {
    "title": "Regulator Line of Business",

    "data": {
      "categories": {
        "No set": {
          "Retail/ Consumer Banking": [
            "Personal (or Retail) Banking",
            "Private Banking",
            "Card Service"
          ],
          "Corporate Banking": [
            "Corporate Finance",
            "Government/Municipal Finance",
            "Merchant Banking",
            "Advisory Service"
          ],
          "Trading & Sales": [
            "Sales",
            "Market Making",
            "Proprietary Positions",
            "Treasury"
          ],
          "Commercial Banking": [
            "Commercial Banking"
          ],
          "Payment and Settlement": [
            "External Clients"
          ],
          "Agency Services": [
            "Custody",
            "Corporate Agency",
            "Corporate Trust"
          ],
          "Assets Management": [
            "Discretionary Funds Management",
            "Non-Discretionary Funds Management"
          ],
          "Retail Brokerage": [
            "Retail Brokerage"
          ]
        }
      }
    }
  },
  {
    "title": "Product Type",
    "data": {
      "categories": {
        "No set": {
          "Commercial Banking": {
            "Liability Products": [
              "Business Account",
              "RapidCollect",
              "DiGi Banking Account"
            ],
            "Payment & Collections Products": [
              "Bank Draft",
              "Bill Payment",
              "Funds Transfer",
              "OmniLite"
            ],
            "Card Products": [
              "Business Prepaid Cards"
            ],
            "Asset Products": [
              "Contract/LPO/Receivables Financing",
              "Inventory & Distributors Finance",
              "Cash/T-Bill/Bank Guarantee Backed",
              "Merchant Cash Advance",
              "Trade Loans"
            ],
            "Bancassurance": [
              "Commercial Asset Insurance",
              "Engineering Insurance",
              "Marine and Cargo Insurance",
              "Key Man Insurance",
              "Business Travel Insurance",
              "Credit Insurance",
              "Agric Yield Insurance"
            ],
            "Gender Financing": [
              "Ellevate"
            ],
            "Channels": [
              "Ecobank Pay",
              "POS"
            ]
          },
          "Consumer Banking": {
            "Liability Products (CASA)": [
              "Evolution Account",
              "Currents Accounts",
              "Islamic Account",
              "Project Account",
              "Salary Account",
              "Save as you Spend",
              "Savings Accounts",
              "Student Account",
              "Super Saver",
              "Term deposit",
              "X-Press Account",
              "X-Press Account Plus",
              "X-Press Save"
            ],
            "Payment Products": [
              "Airtime recharge",
              "Bank Drafts",
              "Mobile Money Transfers",
              "X-Press Cash",
              "Bills Payment",
              "EcobankPay",
              "Funds Transfers"
            ],
            "Remittance Products": [
              "Africa Rapid Transfer",
              "Moneygram",
              "Rapid Transfer International",
              "Ria",
              "Small World",
              "Transfast",
              "Western Union",
              "WorldRemit"
            ],
            "Cards Products": [
              "Credit Cards",
              "Debit Cards",
              "PAC (Pan African Card)",
              "Prepaid Cards",
              "Virtual Cards"
            ],
            "Channel": [
              "Mobile App",
              "Ecobank Online",
              "USSD",
              "Rafiki",
              "Xpress Point",
              "ATMs",
              "Microfinance"
            ]
          },
          "Corporate & Investment Banking (CIB)": {
            "Trade Products": [
              "Trade Finance",
              "Trade Services"
            ],
            "Loan & Liquidity": [
              "Short Term",
              "Long Term"
            ],
            "Treasury FICC": [
              "Foreign Exchange",
              "Fixed Income",
              "Structure Products"
            ]
          }
        }
      }
    }
  },
  {
    "title": "System Type",
    "data": {
      "categories": {
        "No set": {
          "types": [
            "ACH",
            "Advance Plus",
            "Agency Banking",
            "ASTRA",
            "BankCollect",
            "BASYS",
            "CALYPSO",
            "CARD MODULE",
            "CLEARING",
            "CMS",
            "CREDITLENS",
            "ECOBANK OLINE",
            "ECOBANK PAY",
            "ECORTGS",
            "ETRANZACT",
            "EXIMBILL"
          ]
        }
      }
    }
  },
  {
    "title": "Boundary Event Classification",
    "data": {
      "categories": {
        "No set": [
          "Credit Boundary",
          "Market Boundary Event",
          "Operational Risk Event"
        ]
      }
    }
  },

  {
    "title": "Causes",
    "data": {
      "categories": {
        "Internal Fraud": {
          "Unauthorised Activity": [
            "Transaction intentionally not reported",
            "Activity in authorized products",
            "Limit Breaches",
            "Intentionally mis-marking a position",
            "Unauthorized P&L or GL Debit",
            "Unauthorized Nostro Outstanding",
            "Unauthorized Interbranch Outstanding",
            "Unauthorized Sundry Accounts Oustanding",
            "Unauthorized Account Revelvables Oustanding",
            "Unauthorized Staff Account Transactions",
            "Saving Accounts Overdrafts",
            "Access to inappropriate websites",
            "Unauthorized Acces to Accounts (staff)",
            "User profile Misuse",
            "Signature library Access (Unauthoized)",
            "Faisifying personal details",
            "Thet of information with consequent loss",
            "Computer system fraud ",
            "Unathorized Customer Account Debit",
          ],
          "That and Fraud": "That and Fraud",
          "System Security Internal-wilful Damage": "System Security Internal-wilful Damage"
        },
        "External Fraud": {
          "Theft and Fraud": [
            "Unauthorized ATM withdrawals",
            "Agent or direct sales frauds",
            "Armed/Branch Robbery",
            "Theft or disappearance of cash",
            "Theft of disappearance of assets",
            "Expense Fraud",
            "Mailcious distruction of assets",
            "Disclosure of confidential information",
            "Accounting irregularities",
            "Taking bribes or other gifts ",
            "Insider dealing",
            "Counterfeit documents",
            "Counterfeit currency",
            "Counterfeit cheques",
            "Manually Initiated funds transfers (MIFT)",
            "Electronic banking",
            "Cheques fraud ",
            "Credit card fraud",
            "Identity theft",
            "Debit card fraud",
            "Credit/loan fraud",
            "Negociation instruments"
          ],
          "System security": "System security"
        },
        "Employment pratices and workplace safety": {
          "Employee relations": [
            "Harassment",
            "Keyman loss",
            "Management ",
            "Employment contracts",
            "Wrongful dismissal",
            "Compensation paid on termination"
          ],
          "Safe environment": [
            "Heath and safety",
            "Employee liability",
            "General liability",
            "Employee compensation",

          ],
          "Diversity and discrimination ": [
            "Equal opportunities",
            "Discrimination (age/gender/other)",
            "Humain rights"

          ],
        },
        "Clients,products and business pratices": {
          "Suitability,disciosure and fiduciary": [
            "Treading customers fairiy",
            "Customer compliants",
            "Regulatory compliance",
            "Disclosure violations",
            "Suitability issues",
            "Sales churning",

          ],
          "Improper businessor market pratices": [
            "Money laudering",
            "Improper trade or market pratices",
            "Insider dealing",
            "Sales pratices",
            "Antitrust",
            "Officer negligence",
            "Unlicensed activities",
          ],
          "Products flaws ": [
            "Products design flaws",
            "Literature circulated",
            "Product Modeling errors"
          ],
          "Selection,sponsorship and exposure": [
            "Client investigations",
            "Dealings with unauthorized client/counterparty",
            "Exceeding client expsoure limit"
          ],
          "Advisory activities": [
            "Mis selling",
            "Disputes over advisory services"
          ],
        },

        "Damage to physical assets": {
          "Disasters and other events": [
            "Natural losses",
            "Vandalism and terrorism",
            "Damage and loss to physical assets"
          ],
          "Accidents & public safety":"Accidents & public safety",
          "Wilful Damage & Terrorism": "Wilful Damage & Terrorism"

        },
        "Business disruption and system failures": {
          "Systems": [
            "Hardware",
            "Software",
            "Telecommunications",
            "Networks Failure",
            "Utility outage / disruptions",
            "Inappropriate architecture",
            "Strategic risk (platforms/suppliers)",
            "Incompatibility with existing systems",
            "Inappropriate definition of business requirements",
            "Incorrect build/buy decisions",
            "Obsolescence of hardware",
            "Obsolescence of software",
            "Inadequate or untested business continuity plan",
            "Inadequate project management",
            "Cost/ Time overruns",
            "Programming errors-External/internal",
            "Unauthorized changes to software",
            "Failure to integrate / migrate with / from existing systems",
            "Failure of systems to meet business requirement",
            "Operations procedures inadequate/ not followed",
            "External Security breaches",
            "Internal Security breaches",
            "Trojan Horses/Computer Viruses"
          ]
        },
        "Execution, delivery and process management": {
          "Transaction capture, execution and maintenance": [
            "Miscommunication",
            "Data entry, maintenance or loading error",
            "Missed deadline or responsibility",
            "Customer service failure",
            "System misoperation or error",
            "Transaction processing error",
            "Management information failure",
            "Documentation weaknesses",
            "Accounting error / entry attribution error",
            "Incorrect pricing",
            "Delivery failure",
            "Collateral management failure",
            "Reference Data Maintenance"
          ],
          "Monitoring and reporting": [
            "Failed mandatory reporting obligation",
            "Monitoring failures",
            "External reporting failures",
            "Regulatory compliance reporting breaches"
          ],
          "Customer intake and documentation": [
            "Client permissions / disclaimers missing",
            "KYC failures",
            "Legal documents missing / incomplete",
            "Contract failures"
          ],
          "Customer / client account management": [
            "Unapproved access given to accounts",
            "Incorrect client records (loss incurred)",
            "Payment failures",
            "Negligent loss or damage of client assets"
          ],
          "Trade counterparties": [
            "Non-client counterparty misperformance",
            "Miscellaneous non-client counterparty disputes"
          ],
          "Vendors and suppliers": [
            "Outsourcing/performance failures",
            "Cash Mobilization Litigation Loss",
            "Vendor disputes"
          ]
        }
      }
    }
  },
];

export default data;
