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
        "IF Internal Fraud": {
          "IF.1 Unauthorised Activity": [
            "IF.1.01 Transaction intentionally not reported",
            "IF.1.02 Activity in authorized products",
            "IF.1.03 Limit Breaches",
            "IF.1.04 Intentionally mis-marking a position",
            "IF.1.05 Unauthorized P&L or GL Debit",
            "IF.1.06 Unauthorized Nostro Outstanding",
            "IF.1.07 Unauthorized Interbranch Outstanding",
            "IF.1.08 Unauthorized Sundry Accounts Oustanding",
            "IF.1.09 Unauthorized Account Revelvables Oustanding",
            "IF.1.10 Unauthorized Staff Account Transactions",
            "IF.1.11 Saving Accounts Overdrafts",
            "IF.1.12 Access to inappropriate websites",
            "IF.1.13 Unauthorized Acces to Accounts (staff)",
            "IF.1.14 User profile Misuse",
            "IF.1.15 Signature library Access (Unauthoized)",
            "IF.1.16 Faisifying personal details",
            "IF.1.17 Thet of information with consequent loss",
            "IF.1.18 Computer system fraud ",
            "IF.1.19 Unathorized Customer Account Debit",
          ],
          "IF.2 That and Fraud": "IF.2 That and Fraud",
          "IF.3 System Security Internal-wilful Damage": "IF.3 System Security Internal-wilful Damage"
        },
        "EF External Fraud": {
          "EF.1 Theft and Fraud": [
            "EF.1.1 Unauthorized ATM withdrawals",
            "EF.1.2 Agent or direct sales frauds",
            "EF.1.3 Armed/Branch Robbery",
            "EF.1.4 Theft or disappearance of cash",
            "EF.1.5 Theft of disappearance of assets",
            "EF.1.6 Expense Fraud",
            "EF.1.7 Mailcious distruction of assets",
            "EF.1.8 Disclosure of confidential information",
            "EF.1.9 Accounting irregularities",
            "EF.1.10 Taking bribes or other gifts ",
            "EF.1.11 Insider dealing",
            "EF.1.12 Counterfeit documents",
            "EF.1.13 Counterfeit currency",
            "EF.1.14 Counterfeit cheques",
            "EF.1.15 Manually Initiated funds transfers (MIFT)",
            "EF.1.16 Electronic banking",
            "EF.1.17 Cheques fraud ",
            "EF.1.18 Credit card fraud",
            "EF.1.19 Identity theft",
            "EF.1.20 Debit card fraud",
            "EF.1.21 Credit/loan fraud",
            "EF.1.22 Negociation instruments"
          ],
          "EF.2 System security": "EF.2 System security"
        },
        "EMP Employment pratices and workplace safety": {
          "EMP.1 Employee relations": [
            "EMP.1.1 Harassment",
            "EMP.1.2 Keyman loss",
            "EMP.1.3 Management ",
            "EMP.1.4 Employment contracts",
            "EMP.1.5 Wrongful dismissal",
            "EMP.1.6 Compensation paid on termination"
          ],
          "EMP.2 Safe environment": [
            "EMP.2.1 Heath and safety",
            "EMP.2.2 Employee liability",
            "EMP.2.3 General liability",
            "EMP.2.4 Employee compensation",

          ],
          "EMP.3 Diversity and discrimination ": [
            "EMP.3.1 Equal opportunities",
            "EMP.3.2 Discrimination (age/gender/other)",
            "EMP.3.3 Humain rights"

          ],
        },
        "CLI Clients,products and business pratices": {
          "CLI.1 Suitability,disciosure and fiduciary": [
            "CLI.1.1 Treading customers fairiy",
            "CLI.1.2 Customer compliants",
            "CLI.1.3 Regulatory compliance",
            "CLI.1.4 Disclosure violations",
            "CLI.1.5 Suitability issues",
            "CLI.1.6 Sales churning",

          ],
          "CLI.2 Improper businessor market pratices": [
            "CLI.2.1 Money laudering",
            "CLI.2.2 Improper trade or market pratices",
            "CLI.2.3 Insider dealing",
            "CLI.2.4 Sales pratices",
            "CLI.2.5 Antitrust",
            "CLI.2.6 Officer negligence",
            "CLI.2.7 Unlicensed activities",
          ],
          "CLI.3 Products flaws ": [
            "CLI.3.1 Products design flaws",
            "CLI.3.2 Literature circulated",
            "CLI.3.3 Product Modeling errors"
          ],
          "CLI.4 Selection,sponsorship and exposure": [
            "CLI.4.1 Client investigations",
            "CLI.4.2 Dealings with unauthorized client/counterparty",
            "CLI.4.3 Exceeding client expsoure limit"
          ],
          "CLI.5 Advisory activities": [
            "CLI.5.1 Mis selling",
            "CLI.5.2 Disputes over advisory services"
          ],
        },

        "DAM Damage to physical assets": {
          "DAM.1 Disasters and other events": [
            "DAM.1.1 Natural losses",
            "DAM.1.2 Vandalism and terrorism",
            "DAM.1.3 Damage and loss to physical assets"
          ],
          "DAM.2 Accidents & public safety":"DAM.2 Accidents & public safety",
          "DAM.3 Wilful Damage & Terrorism": "DAM.3 Wilful Damage & Terrorism"

        },
        "BUS Business disruption and system failures": {
          "BUS.1 Systems": [
            "BUS.1.1 Hardware",
            "BUS.1.2 Software",
            "BUS.1.3 Telecommunications",
            "BUS.1.4 Networks Failure",
            "BUS.1.5 Utility outage / disruptions",
            "BUS.1.6 Inappropriate architecture",
            "BUS.1.7 Strategic risk (platforms/suppliers)",
            "BUS.1.8 Incompatibility with existing systems",
            "BUS.1.9 Inappropriate definition of business requirements",
            "BUS.1.10 Incorrect build/buy decisions",
            "BUS.1.11 Obsolescence of hardware",
            "BUS.1.12 Obsolescence of software",
            "BUS.1.13 Inadequate or untested business continuity plan",
            "BUS.1.14 Inadequate project management",
            "BUS.1.15 Cost/ Time overruns",
            "BUS.1.16 Programming errors-External/internal",
            "BUS.1.17 Unauthorized changes to software",
            "BUS.1.18 Failure to integrate / migrate with / from existing systems",
            "BUS.1.19 Failure of systems to meet business requirement",
            "BUS.1.20 Operations procedures inadequate/ not followed",
            "BUS.1.21 External Security breaches",
            "BUS.1.22 Internal Security breaches",
            "BUS.1.23 Trojan Horses/Computer Viruses"
          ]
        },
        "EXE Execution, delivery and process management": {
          "EXE.1 Transaction capture, execution and maintenance": [
            "EXE.1.1 Miscommunication",
            "EXE.1.2 Data entry, maintenance or loading error",
            "EXE.1.3 Missed deadline or responsibility",
            "EXE.1.4 Customer service failure",
            "EXE.1.5 System misoperation or error",
            "EXE.1.6 Transaction processing error",
            "EXE.1.7 Management information failure",
            "EXE.1.8 Documentation weaknesses",
            "EXE.1.9 Accounting error / entry attribution error",
            "EXE.1.10 Incorrect pricing",
            "EXE.1.11 Delivery failure",
            "EXE.1.12 Collateral management failure",
            "EXE.1.13 Reference Data Maintenance"
          ],
          "EXE.2 Monitoring and reporting": [
            "EXE.2.1 Failed mandatory reporting obligation",
            "EXE.2.2 Monitoring failures",
            "EXE.2.3 External reporting failures",
            "EXE.2.4 Regulatory compliance reporting breaches"
          ],
          "EXE.3 Customer intake and documentation": [
            "EXE.3.1 Client permissions / disclaimers missing",
            "EXE.3.2 KYC failures",
            "EXE.3.3 Legal documents missing / incomplete",
            "EXE.3.4 Contract failures"
          ],
          "EXE.4 Customer / client account management": [
            "EXE.4.1 Unapproved access given to accounts",
            "EXE.4.2 Incorrect client records (loss incurred)",
            "EXE.4.3 Payment failures",
            "EXE.4.4 Negligent loss or damage of client assets"
          ],
          "EXE.5 Trade counterparties": [
            "EXE.5.1 Non-client counterparty misperformance",
            "EXE.5.2 Miscellaneous non-client counterparty disputes"
          ],
          "EXE.6 Vendors and suppliers": [
            "EXE.6.1 Outsourcing/performance failures",
            "EXE.6.2 Cash Mobilization Litigation Loss",
            "EXE.6.3 Vendor disputes"
          ]
        }
      }
    }
  },
];

export default data;
