// File generated from our OpenAPI spec

declare module 'stripe' {
  namespace Stripe {
    namespace Checkout {
      /**
       * A Checkout Session represents your customer's session as they pay for
       * one-time purchases or subscriptions through [Checkout](https://stripe.com/docs/payments/checkout)
       * or [Payment Links](https://stripe.com/docs/payments/payment-links). We recommend creating a
       * new Session each time your customer attempts to pay.
       *
       * Once payment is successful, the Checkout Session will contain a reference
       * to the [Customer](https://stripe.com/docs/api/customers), and either the successful
       * [PaymentIntent](https://stripe.com/docs/api/payment_intents) or an active
       * [Subscription](https://stripe.com/docs/api/subscriptions).
       *
       * You can create a Checkout Session on your server and pass its ID to the
       * client to begin Checkout.
       *
       * Related guide: [Checkout Quickstart](https://stripe.com/docs/checkout/quickstart).
       */
      interface Session {
        /**
         * Unique identifier for the object. Used to pass to `redirectToCheckout`
         * in Stripe.js.
         */
        id: string;

        /**
         * String representing the object's type. Objects of the same type share the same value.
         */
        object: 'checkout.session';

        /**
         * When set, provides configuration for actions to take if this Checkout Session expires.
         */
        after_expiration: Session.AfterExpiration | null;

        /**
         * Enables user redeemable promotion codes.
         */
        allow_promotion_codes: boolean | null;

        /**
         * Total of all items before discounts or taxes are applied.
         */
        amount_subtotal: number | null;

        /**
         * Total of all items after discounts and taxes are applied.
         */
        amount_total: number | null;

        automatic_tax: Session.AutomaticTax;

        /**
         * Describes whether Checkout should collect the customer's billing address.
         */
        billing_address_collection: Session.BillingAddressCollection | null;

        /**
         * The URL the customer will be directed to if they decide to cancel payment and return to your website.
         */
        cancel_url: string;

        /**
         * A unique string to reference the Checkout Session. This can be a
         * customer ID, a cart ID, or similar, and can be used to reconcile the
         * Session with your internal systems.
         */
        client_reference_id: string | null;

        /**
         * Results of `consent_collection` for this session.
         */
        consent: Session.Consent | null;

        /**
         * When set, provides configuration for the Checkout Session to gather active consent from customers.
         */
        consent_collection: Session.ConsentCollection | null;

        /**
         * Time at which the object was created. Measured in seconds since the Unix epoch.
         */
        created: number;

        /**
         * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
         */
        currency: string | null;

        custom_text: Session.CustomText;

        /**
         * The ID of the customer for this Session.
         * For Checkout Sessions in `payment` or `subscription` mode, Checkout
         * will create a new customer object based on information provided
         * during the payment flow unless an existing customer was provided when
         * the Session was created.
         */
        customer: string | Stripe.Customer | Stripe.DeletedCustomer | null;

        /**
         * Configure whether a Checkout Session creates a Customer when the Checkout Session completes.
         */
        customer_creation: Session.CustomerCreation | null;

        /**
         * The customer details including the customer's tax exempt status and the customer's tax IDs. Only the customer's email is present on Sessions in `setup` mode.
         */
        customer_details: Session.CustomerDetails | null;

        /**
         * If provided, this value will be used when the Customer object is created.
         * If not provided, customers will be asked to enter their email address.
         * Use this parameter to prefill customer data if you already have an email
         * on file. To access information about the customer once the payment flow is
         * complete, use the `customer` attribute.
         */
        customer_email: string | null;

        /**
         * The timestamp at which the Checkout Session will expire.
         */
        expires_at: number;

        /**
         * The line items purchased by the customer.
         */
        line_items?: ApiList<Stripe.LineItem>;

        /**
         * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
         */
        livemode: boolean;

        /**
         * The IETF language tag of the locale Checkout is displayed in. If blank or `auto`, the browser's locale is used.
         */
        locale: Session.Locale | null;

        /**
         * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
         */
        metadata: Stripe.Metadata | null;

        /**
         * The mode of the Checkout Session.
         */
        mode: Session.Mode;

        /**
         * The ID of the PaymentIntent for Checkout Sessions in `payment` mode.
         */
        payment_intent: string | Stripe.PaymentIntent | null;

        /**
         * The ID of the Payment Link that created this Session.
         */
        payment_link: string | Stripe.PaymentLink | null;

        /**
         * Configure whether a Checkout Session should collect a payment method.
         */
        payment_method_collection: Session.PaymentMethodCollection | null;

        /**
         * Payment-method-specific configuration for the PaymentIntent or SetupIntent of this CheckoutSession.
         */
        payment_method_options: Session.PaymentMethodOptions | null;

        /**
         * A list of the types of payment methods (e.g. card) this Checkout
         * Session is allowed to accept.
         */
        payment_method_types: Array<string>;

        /**
         * The payment status of the Checkout Session, one of `paid`, `unpaid`, or `no_payment_required`.
         * You can use this value to decide when to fulfill your customer's order.
         */
        payment_status: Session.PaymentStatus;

        phone_number_collection?: Session.PhoneNumberCollection;

        /**
         * The ID of the original expired Checkout Session that triggered the recovery flow.
         */
        recovered_from: string | null;

        /**
         * The ID of the SetupIntent for Checkout Sessions in `setup` mode.
         */
        setup_intent: string | Stripe.SetupIntent | null;

        /**
         * When set, provides configuration for Checkout to collect a shipping address from a customer.
         */
        shipping_address_collection: Session.ShippingAddressCollection | null;

        /**
         * The details of the customer cost of shipping, including the customer chosen ShippingRate.
         */
        shipping_cost: Session.ShippingCost | null;

        /**
         * Shipping information for this Checkout Session.
         */
        shipping_details: Session.ShippingDetails | null;

        /**
         * The shipping rate options applied to this Session.
         */
        shipping_options: Array<Session.ShippingOption>;

        /**
         * The status of the Checkout Session, one of `open`, `complete`, or `expired`.
         */
        status: Session.Status | null;

        /**
         * Describes the type of transaction being performed by Checkout in order to customize
         * relevant text on the page, such as the submit button. `submit_type` can only be
         * specified on Checkout Sessions in `payment` mode, but not Checkout Sessions
         * in `subscription` or `setup` mode.
         */
        submit_type: Session.SubmitType | null;

        /**
         * The ID of the subscription for Checkout Sessions in `subscription` mode.
         */
        subscription: string | Stripe.Subscription | null;

        /**
         * The URL the customer will be directed to after the payment or
         * subscription creation is successful.
         */
        success_url: string;

        tax_id_collection?: Session.TaxIdCollection;

        /**
         * Tax and discount details for the computed total amount.
         */
        total_details: Session.TotalDetails | null;

        /**
         * The URL to the Checkout Session. Redirect customers to this URL to take them to Checkout. If you're using [Custom Domains](https://stripe.com/docs/payments/checkout/custom-domains), the URL will use your subdomain. Otherwise, it'll use `checkout.stripe.com.`
         * This value is only present when the session is active.
         */
        url: string | null;
      }

      namespace Session {
        interface AfterExpiration {
          /**
           * When set, configuration used to recover the Checkout Session on expiry.
           */
          recovery: AfterExpiration.Recovery | null;
        }

        namespace AfterExpiration {
          interface Recovery {
            /**
             * Enables user redeemable promotion codes on the recovered Checkout Sessions. Defaults to `false`
             */
            allow_promotion_codes: boolean;

            /**
             * If `true`, a recovery url will be generated to recover this Checkout Session if it
             * expires before a transaction is completed. It will be attached to the
             * Checkout Session object upon expiration.
             */
            enabled: boolean;

            /**
             * The timestamp at which the recovery URL will expire.
             */
            expires_at: number | null;

            /**
             * URL that creates a new Checkout Session when clicked that is a copy of this expired Checkout Session
             */
            url: string | null;
          }
        }

        interface AutomaticTax {
          /**
           * Indicates whether automatic tax is enabled for the session
           */
          enabled: boolean;

          /**
           * The status of the most recent automated tax calculation for this session.
           */
          status: AutomaticTax.Status | null;
        }

        namespace AutomaticTax {
          type Status = 'complete' | 'failed' | 'requires_location_inputs';
        }

        type BillingAddressCollection = 'auto' | 'required';

        interface Consent {
          /**
           * If `opt_in`, the customer consents to receiving promotional communications
           * from the merchant about this Checkout Session.
           */
          promotions: Consent.Promotions | null;

          /**
           * If `accepted`, the customer in this Checkout Session has agreed to the merchant's terms of service.
           */
          terms_of_service: 'accepted' | null;
        }

        namespace Consent {
          type Promotions = 'opt_in' | 'opt_out';
        }

        interface ConsentCollection {
          /**
           * If set to `auto`, enables the collection of customer consent for promotional communications. The Checkout
           * Session will determine whether to display an option to opt into promotional communication
           * from the merchant depending on the customer's locale. Only available to US merchants.
           */
          promotions: ConsentCollection.Promotions | null;

          /**
           * If set to `required`, it requires customers to accept the terms of service before being able to pay.
           */
          terms_of_service: ConsentCollection.TermsOfService | null;
        }

        namespace ConsentCollection {
          type Promotions = 'auto' | 'none';

          type TermsOfService = 'none' | 'required';
        }

        type CustomerCreation = 'always' | 'if_required';

        interface CustomerDetails {
          /**
           * The customer's address after a completed Checkout Session. Note: This property is populated only for sessions on or after March 30, 2022.
           */
          address: Stripe.Address | null;

          /**
           * The email associated with the Customer, if one exists, on the Checkout Session after a completed Checkout Session or at time of session expiry.
           * Otherwise, if the customer has consented to promotional content, this value is the most recent valid email provided by the customer on the Checkout form.
           */
          email: string | null;

          /**
           * The customer's name after a completed Checkout Session. Note: This property is populated only for sessions on or after March 30, 2022.
           */
          name: string | null;

          /**
           * The customer's phone number after a completed Checkout Session.
           */
          phone: string | null;

          /**
           * The customer's tax exempt status after a completed Checkout Session.
           */
          tax_exempt: CustomerDetails.TaxExempt | null;

          /**
           * The customer's tax IDs after a completed Checkout Session.
           */
          tax_ids: Array<CustomerDetails.TaxId> | null;
        }

        namespace CustomerDetails {
          type TaxExempt = 'exempt' | 'none' | 'reverse';

          interface TaxId {
            /**
             * The type of the tax ID, one of `eu_vat`, `br_cnpj`, `br_cpf`, `eu_oss_vat`, `gb_vat`, `nz_gst`, `au_abn`, `au_arn`, `in_gst`, `no_vat`, `za_vat`, `ch_vat`, `mx_rfc`, `sg_uen`, `ru_inn`, `ru_kpp`, `ca_bn`, `hk_br`, `es_cif`, `tw_vat`, `th_vat`, `jp_cn`, `jp_rn`, `jp_trn`, `li_uid`, `my_itn`, `us_ein`, `kr_brn`, `ca_qst`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `my_sst`, `sg_gst`, `ae_trn`, `cl_tin`, `sa_vat`, `id_npwp`, `my_frp`, `il_vat`, `ge_vat`, `ua_vat`, `is_vat`, `bg_uic`, `hu_tin`, `si_tin`, `ke_pin`, `tr_tin`, `eg_tin`, `ph_tin`, or `unknown`
             */
            type: TaxId.Type;

            /**
             * The value of the tax ID.
             */
            value: string | null;
          }

          namespace TaxId {
            type Type =
              | 'ae_trn'
              | 'au_abn'
              | 'au_arn'
              | 'bg_uic'
              | 'br_cnpj'
              | 'br_cpf'
              | 'ca_bn'
              | 'ca_gst_hst'
              | 'ca_pst_bc'
              | 'ca_pst_mb'
              | 'ca_pst_sk'
              | 'ca_qst'
              | 'ch_vat'
              | 'cl_tin'
              | 'eg_tin'
              | 'es_cif'
              | 'eu_oss_vat'
              | 'eu_vat'
              | 'gb_vat'
              | 'ge_vat'
              | 'hk_br'
              | 'hu_tin'
              | 'id_npwp'
              | 'il_vat'
              | 'in_gst'
              | 'is_vat'
              | 'jp_cn'
              | 'jp_rn'
              | 'jp_trn'
              | 'ke_pin'
              | 'kr_brn'
              | 'li_uid'
              | 'mx_rfc'
              | 'my_frp'
              | 'my_itn'
              | 'my_sst'
              | 'no_vat'
              | 'nz_gst'
              | 'ph_tin'
              | 'ru_inn'
              | 'ru_kpp'
              | 'sa_vat'
              | 'sg_gst'
              | 'sg_uen'
              | 'si_tin'
              | 'th_vat'
              | 'tr_tin'
              | 'tw_vat'
              | 'ua_vat'
              | 'unknown'
              | 'us_ein'
              | 'za_vat';
          }
        }

        interface CustomText {
          /**
           * Custom text that should be displayed alongside shipping address collection.
           */
          shipping_address: CustomText.ShippingAddress | null;

          /**
           * Custom text that should be displayed alongside the payment confirmation button.
           */
          submit: CustomText.Submit | null;
        }

        namespace CustomText {
          interface ShippingAddress {
            /**
             * Text may be up to 500 characters in length.
             */
            message: string;
          }

          interface Submit {
            /**
             * Text may be up to 500 characters in length.
             */
            message: string;
          }
        }

        type Locale =
          | 'auto'
          | 'bg'
          | 'cs'
          | 'da'
          | 'de'
          | 'el'
          | 'en'
          | 'en-GB'
          | 'es'
          | 'es-419'
          | 'et'
          | 'fi'
          | 'fil'
          | 'fr'
          | 'fr-CA'
          | 'hr'
          | 'hu'
          | 'id'
          | 'it'
          | 'ja'
          | 'ko'
          | 'lt'
          | 'lv'
          | 'ms'
          | 'mt'
          | 'nb'
          | 'nl'
          | 'pl'
          | 'pt'
          | 'pt-BR'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sv'
          | 'th'
          | 'tr'
          | 'vi'
          | 'zh'
          | 'zh-HK'
          | 'zh-TW';

        type Mode = 'payment' | 'setup' | 'subscription';

        type PaymentMethodCollection = 'always' | 'if_required';

        interface PaymentMethodOptions {
          acss_debit?: PaymentMethodOptions.AcssDebit;

          affirm?: PaymentMethodOptions.Affirm;

          afterpay_clearpay?: PaymentMethodOptions.AfterpayClearpay;

          alipay?: PaymentMethodOptions.Alipay;

          au_becs_debit?: PaymentMethodOptions.AuBecsDebit;

          bacs_debit?: PaymentMethodOptions.BacsDebit;

          bancontact?: PaymentMethodOptions.Bancontact;

          boleto?: PaymentMethodOptions.Boleto;

          card?: PaymentMethodOptions.Card;

          customer_balance?: PaymentMethodOptions.CustomerBalance;

          eps?: PaymentMethodOptions.Eps;

          fpx?: PaymentMethodOptions.Fpx;

          giropay?: PaymentMethodOptions.Giropay;

          grabpay?: PaymentMethodOptions.Grabpay;

          ideal?: PaymentMethodOptions.Ideal;

          klarna?: PaymentMethodOptions.Klarna;

          konbini?: PaymentMethodOptions.Konbini;

          oxxo?: PaymentMethodOptions.Oxxo;

          p24?: PaymentMethodOptions.P24;

          paynow?: PaymentMethodOptions.Paynow;

          pix?: PaymentMethodOptions.Pix;

          sepa_debit?: PaymentMethodOptions.SepaDebit;

          sofort?: PaymentMethodOptions.Sofort;

          us_bank_account?: PaymentMethodOptions.UsBankAccount;
        }

        namespace PaymentMethodOptions {
          interface AcssDebit {
            /**
             * Currency supported by the bank account. Returned when the Session is in `setup` mode.
             */
            currency?: AcssDebit.Currency;

            mandate_options?: AcssDebit.MandateOptions;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: AcssDebit.SetupFutureUsage;

            /**
             * Bank account verification method.
             */
            verification_method?: AcssDebit.VerificationMethod;
          }

          namespace AcssDebit {
            type Currency = 'cad' | 'usd';

            interface MandateOptions {
              /**
               * A URL for custom mandate text
               */
              custom_mandate_url?: string;

              /**
               * List of Stripe products where this mandate can be selected automatically. Returned when the Session is in `setup` mode.
               */
              default_for?: Array<MandateOptions.DefaultFor>;

              /**
               * Description of the interval. Only required if the 'payment_schedule' parameter is 'interval' or 'combined'.
               */
              interval_description: string | null;

              /**
               * Payment schedule for the mandate.
               */
              payment_schedule: MandateOptions.PaymentSchedule | null;

              /**
               * Transaction type of the mandate.
               */
              transaction_type: MandateOptions.TransactionType | null;
            }

            namespace MandateOptions {
              type DefaultFor = 'invoice' | 'subscription';

              type PaymentSchedule = 'combined' | 'interval' | 'sporadic';

              type TransactionType = 'business' | 'personal';
            }

            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';

            type VerificationMethod = 'automatic' | 'instant' | 'microdeposits';
          }

          interface Affirm {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface AfterpayClearpay {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Alipay {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface AuBecsDebit {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface BacsDebit {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: BacsDebit.SetupFutureUsage;
          }

          namespace BacsDebit {
            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';
          }

          interface Bancontact {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Boleto {
            /**
             * The number of calendar days before a Boleto voucher expires. For example, if you create a Boleto voucher on Monday and you set expires_after_days to 2, the Boleto voucher will expire on Wednesday at 23:59 America/Sao_Paulo time.
             */
            expires_after_days: number;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: Boleto.SetupFutureUsage;
          }

          namespace Boleto {
            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';
          }

          interface Card {
            installments?: Card.Installments;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: Card.SetupFutureUsage;

            /**
             * Provides information about a card payment that customers see on their statements. Concatenated with the Kana prefix (shortened Kana descriptor) or Kana statement descriptor that's set on the account to form the complete statement descriptor. Maximum 22 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 22 characters.
             */
            statement_descriptor_suffix_kana?: string;

            /**
             * Provides information about a card payment that customers see on their statements. Concatenated with the Kanji prefix (shortened Kanji descriptor) or Kanji statement descriptor that's set on the account to form the complete statement descriptor. Maximum 17 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 17 characters.
             */
            statement_descriptor_suffix_kanji?: string;
          }

          namespace Card {
            interface Installments {
              /**
               * Indicates if installments are enabled
               */
              enabled?: boolean;
            }

            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';
          }

          interface CustomerBalance {
            bank_transfer?: CustomerBalance.BankTransfer;

            /**
             * The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.
             */
            funding_type: 'bank_transfer' | null;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          namespace CustomerBalance {
            interface BankTransfer {
              eu_bank_transfer?: BankTransfer.EuBankTransfer;

              /**
               * List of address types that should be returned in the financial_addresses response. If not specified, all valid types will be returned.
               *
               * Permitted values include: `sort_code`, `zengin`, `iban`, or `spei`.
               */
              requested_address_types?: Array<
                BankTransfer.RequestedAddressType
              >;

              /**
               * The bank transfer type that this PaymentIntent is allowed to use for funding Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, or `mx_bank_transfer`.
               */
              type: BankTransfer.Type | null;
            }

            namespace BankTransfer {
              interface EuBankTransfer {
                /**
                 * The desired country code of the bank account information. Permitted values include: `DE`, `ES`, `FR`, `IE`, or `NL`.
                 */
                country: EuBankTransfer.Country;
              }

              namespace EuBankTransfer {
                type Country = 'DE' | 'ES' | 'FR' | 'IE' | 'NL';
              }

              type RequestedAddressType =
                | 'iban'
                | 'sepa'
                | 'sort_code'
                | 'spei'
                | 'zengin';

              type Type =
                | 'eu_bank_transfer'
                | 'gb_bank_transfer'
                | 'jp_bank_transfer'
                | 'mx_bank_transfer';
            }
          }

          interface Eps {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Fpx {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Giropay {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Grabpay {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Ideal {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Klarna {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: Klarna.SetupFutureUsage;
          }

          namespace Klarna {
            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';
          }

          interface Konbini {
            /**
             * The number of calendar days (between 1 and 60) after which Konbini payment instructions will expire. For example, if a PaymentIntent is confirmed with Konbini and `expires_after_days` set to 2 on Monday JST, the instructions will expire on Wednesday 23:59:59 JST.
             */
            expires_after_days: number | null;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Oxxo {
            /**
             * The number of calendar days before an OXXO invoice expires. For example, if you create an OXXO invoice on Monday and you set expires_after_days to 2, the OXXO invoice will expire on Wednesday at 23:59 America/Mexico_City time.
             */
            expires_after_days: number;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface P24 {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Paynow {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface Pix {
            /**
             * The number of seconds after which Pix payment will expire.
             */
            expires_after_seconds: number | null;
          }

          interface SepaDebit {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: SepaDebit.SetupFutureUsage;
          }

          namespace SepaDebit {
            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';
          }

          interface Sofort {
            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: 'none';
          }

          interface UsBankAccount {
            financial_connections?: UsBankAccount.FinancialConnections;

            /**
             * Indicates that you intend to make future payments with this PaymentIntent's payment method.
             *
             * Providing this parameter will [attach the payment method](https://stripe.com/docs/payments/save-during-payment) to the PaymentIntent's Customer, if present, after the PaymentIntent is confirmed and any required actions from the user are complete. If no Customer was provided, the payment method can still be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer after the transaction completes.
             *
             * When processing card payments, Stripe also uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules, such as [SCA](https://stripe.com/docs/strong-customer-authentication).
             */
            setup_future_usage?: UsBankAccount.SetupFutureUsage;

            /**
             * Bank account verification method.
             */
            verification_method?: UsBankAccount.VerificationMethod;
          }

          namespace UsBankAccount {
            interface FinancialConnections {
              /**
               * The list of permissions to request. The `payment_method` permission must be included.
               */
              permissions?: Array<FinancialConnections.Permission>;

              /**
               * For webview integrations only. Upon completing OAuth login in the native browser, the user will be redirected to this URL to return to your app.
               */
              return_url?: string;
            }

            namespace FinancialConnections {
              type Permission =
                | 'balances'
                | 'ownership'
                | 'payment_method'
                | 'transactions';
            }

            type SetupFutureUsage = 'none' | 'off_session' | 'on_session';

            type VerificationMethod = 'automatic' | 'instant';
          }
        }

        type PaymentStatus = 'no_payment_required' | 'paid' | 'unpaid';

        interface PhoneNumberCollection {
          /**
           * Indicates whether phone number collection is enabled for the session
           */
          enabled: boolean;
        }

        interface ShippingAddressCollection {
          /**
           * An array of two-letter ISO country codes representing which countries Checkout should provide as options for
           * shipping locations. Unsupported country codes: `AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SD, SY, UM, VI`.
           */
          allowed_countries: Array<ShippingAddressCollection.AllowedCountry>;
        }

        namespace ShippingAddressCollection {
          type AllowedCountry =
            | 'AC'
            | 'AD'
            | 'AE'
            | 'AF'
            | 'AG'
            | 'AI'
            | 'AL'
            | 'AM'
            | 'AO'
            | 'AQ'
            | 'AR'
            | 'AT'
            | 'AU'
            | 'AW'
            | 'AX'
            | 'AZ'
            | 'BA'
            | 'BB'
            | 'BD'
            | 'BE'
            | 'BF'
            | 'BG'
            | 'BH'
            | 'BI'
            | 'BJ'
            | 'BL'
            | 'BM'
            | 'BN'
            | 'BO'
            | 'BQ'
            | 'BR'
            | 'BS'
            | 'BT'
            | 'BV'
            | 'BW'
            | 'BY'
            | 'BZ'
            | 'CA'
            | 'CD'
            | 'CF'
            | 'CG'
            | 'CH'
            | 'CI'
            | 'CK'
            | 'CL'
            | 'CM'
            | 'CN'
            | 'CO'
            | 'CR'
            | 'CV'
            | 'CW'
            | 'CY'
            | 'CZ'
            | 'DE'
            | 'DJ'
            | 'DK'
            | 'DM'
            | 'DO'
            | 'DZ'
            | 'EC'
            | 'EE'
            | 'EG'
            | 'EH'
            | 'ER'
            | 'ES'
            | 'ET'
            | 'FI'
            | 'FJ'
            | 'FK'
            | 'FO'
            | 'FR'
            | 'GA'
            | 'GB'
            | 'GD'
            | 'GE'
            | 'GF'
            | 'GG'
            | 'GH'
            | 'GI'
            | 'GL'
            | 'GM'
            | 'GN'
            | 'GP'
            | 'GQ'
            | 'GR'
            | 'GS'
            | 'GT'
            | 'GU'
            | 'GW'
            | 'GY'
            | 'HK'
            | 'HN'
            | 'HR'
            | 'HT'
            | 'HU'
            | 'ID'
            | 'IE'
            | 'IL'
            | 'IM'
            | 'IN'
            | 'IO'
            | 'IQ'
            | 'IS'
            | 'IT'
            | 'JE'
            | 'JM'
            | 'JO'
            | 'JP'
            | 'KE'
            | 'KG'
            | 'KH'
            | 'KI'
            | 'KM'
            | 'KN'
            | 'KR'
            | 'KW'
            | 'KY'
            | 'KZ'
            | 'LA'
            | 'LB'
            | 'LC'
            | 'LI'
            | 'LK'
            | 'LR'
            | 'LS'
            | 'LT'
            | 'LU'
            | 'LV'
            | 'LY'
            | 'MA'
            | 'MC'
            | 'MD'
            | 'ME'
            | 'MF'
            | 'MG'
            | 'MK'
            | 'ML'
            | 'MM'
            | 'MN'
            | 'MO'
            | 'MQ'
            | 'MR'
            | 'MS'
            | 'MT'
            | 'MU'
            | 'MV'
            | 'MW'
            | 'MX'
            | 'MY'
            | 'MZ'
            | 'NA'
            | 'NC'
            | 'NE'
            | 'NG'
            | 'NI'
            | 'NL'
            | 'NO'
            | 'NP'
            | 'NR'
            | 'NU'
            | 'NZ'
            | 'OM'
            | 'PA'
            | 'PE'
            | 'PF'
            | 'PG'
            | 'PH'
            | 'PK'
            | 'PL'
            | 'PM'
            | 'PN'
            | 'PR'
            | 'PS'
            | 'PT'
            | 'PY'
            | 'QA'
            | 'RE'
            | 'RO'
            | 'RS'
            | 'RU'
            | 'RW'
            | 'SA'
            | 'SB'
            | 'SC'
            | 'SE'
            | 'SG'
            | 'SH'
            | 'SI'
            | 'SJ'
            | 'SK'
            | 'SL'
            | 'SM'
            | 'SN'
            | 'SO'
            | 'SR'
            | 'SS'
            | 'ST'
            | 'SV'
            | 'SX'
            | 'SZ'
            | 'TA'
            | 'TC'
            | 'TD'
            | 'TF'
            | 'TG'
            | 'TH'
            | 'TJ'
            | 'TK'
            | 'TL'
            | 'TM'
            | 'TN'
            | 'TO'
            | 'TR'
            | 'TT'
            | 'TV'
            | 'TW'
            | 'TZ'
            | 'UA'
            | 'UG'
            | 'US'
            | 'UY'
            | 'UZ'
            | 'VA'
            | 'VC'
            | 'VE'
            | 'VG'
            | 'VN'
            | 'VU'
            | 'WF'
            | 'WS'
            | 'XK'
            | 'YE'
            | 'YT'
            | 'ZA'
            | 'ZM'
            | 'ZW'
            | 'ZZ';
        }

        interface ShippingCost {
          /**
           * Total shipping cost before any discounts or taxes are applied.
           */
          amount_subtotal: number;

          /**
           * Total tax amount applied due to shipping costs. If no tax was applied, defaults to 0.
           */
          amount_tax: number;

          /**
           * Total shipping cost after discounts and taxes are applied.
           */
          amount_total: number;

          /**
           * The ID of the ShippingRate for this order.
           */
          shipping_rate: string | Stripe.ShippingRate | null;

          /**
           * The taxes applied to the shipping rate.
           */
          taxes?: Array<ShippingCost.Tax>;
        }

        namespace ShippingCost {
          interface Tax {
            /**
             * Amount of tax applied for this rate.
             */
            amount: number;

            /**
             * Tax rates can be applied to [invoices](https://stripe.com/docs/billing/invoices/tax-rates), [subscriptions](https://stripe.com/docs/billing/subscriptions/taxes) and [Checkout Sessions](https://stripe.com/docs/payments/checkout/set-up-a-subscription#tax-rates) to collect tax.
             *
             * Related guide: [Tax Rates](https://stripe.com/docs/billing/taxes/tax-rates).
             */
            rate: Stripe.TaxRate;
          }
        }

        interface ShippingDetails {
          address?: Stripe.Address;

          /**
           * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
           */
          carrier?: string | null;

          /**
           * Recipient name.
           */
          name?: string;

          /**
           * Recipient phone (including extension).
           */
          phone?: string | null;

          /**
           * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
           */
          tracking_number?: string | null;
        }

        interface ShippingOption {
          /**
           * A non-negative integer in cents representing how much to charge.
           */
          shipping_amount: number;

          /**
           * The shipping rate.
           */
          shipping_rate: string | Stripe.ShippingRate;
        }

        type Status = 'complete' | 'expired' | 'open';

        type SubmitType = 'auto' | 'book' | 'donate' | 'pay';

        interface TaxIdCollection {
          /**
           * Indicates whether tax ID collection is enabled for the session
           */
          enabled: boolean;
        }

        interface TotalDetails {
          /**
           * This is the sum of all the discounts.
           */
          amount_discount: number;

          /**
           * This is the sum of all the shipping amounts.
           */
          amount_shipping: number | null;

          /**
           * This is the sum of all the tax amounts.
           */
          amount_tax: number;

          breakdown?: TotalDetails.Breakdown;
        }

        namespace TotalDetails {
          interface Breakdown {
            /**
             * The aggregated discounts.
             */
            discounts: Array<Breakdown.Discount>;

            /**
             * The aggregated tax amounts by rate.
             */
            taxes: Array<Breakdown.Tax>;
          }

          namespace Breakdown {
            interface Discount {
              /**
               * The amount discounted.
               */
              amount: number;

              /**
               * A discount represents the actual application of a [coupon](https://stripe.com/docs/api#coupons) or [promotion code](https://stripe.com/docs/api#promotion_codes).
               * It contains information about when the discount began, when it will end, and what it is applied to.
               *
               * Related guide: [Applying Discounts to Subscriptions](https://stripe.com/docs/billing/subscriptions/discounts).
               */
              discount: Stripe.Discount;
            }

            interface Tax {
              /**
               * Amount of tax applied for this rate.
               */
              amount: number;

              /**
               * Tax rates can be applied to [invoices](https://stripe.com/docs/billing/invoices/tax-rates), [subscriptions](https://stripe.com/docs/billing/subscriptions/taxes) and [Checkout Sessions](https://stripe.com/docs/payments/checkout/set-up-a-subscription#tax-rates) to collect tax.
               *
               * Related guide: [Tax Rates](https://stripe.com/docs/billing/taxes/tax-rates).
               */
              rate: Stripe.TaxRate;
            }
          }
        }
      }
    }
  }
}