import React, { useContext } from "react";
import { ShopContext } from "../../store/context";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useForm, FormContext } from "react-hook-form";
import FormInput from "../Form/FormInput";

const Info = () => {
  const methods = useForm();
  const history = useHistory();
  const { updateShippingAddress, checkout } = useContext(ShopContext);
  const { checkoutUserErrors } = checkout;

  const onShippingSubmit = async (data) => {
    if (data) {
      await updateShippingAddress(data);
      await history.push("/checkout/shipping");
    }

    //send shipping address to shopify
  };

  return (
    <Container>
      <Section>
        <h1 className="title">Contact Information</h1>
        <SectionHeader>
          <h3>
            Dont have an account? <Link to="/signup">Sign Up</Link>
          </h3>
          <h3>
            Already have an account? <Link to="/login">Log In</Link>
          </h3>
        </SectionHeader>
        {/* <FormContext {...methods}>
          <FormInput
            name="email"
            title="Email"
            registration={{
              required: true,
            }}
          />
        </FormContext> */}
      </Section>
      <Section>
        <SectionHeader>
          <h1 className="title">Shipping Address</h1>
        </SectionHeader>
        <FormContext {...methods}>
          <ul>
            {checkoutUserErrors &&
              checkoutUserErrors.map((error) => <li>{error.message}</li>)}
          </ul>
          <form onSubmit={methods.handleSubmit(onShippingSubmit)}>
            <FormInput
              name="firstName"
              title="First Name"
              width="50%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="lastName"
              title="Last Name"
              width="50%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="address1"
              title="Address"
              registration={{
                required: true,
              }}
            />
            <FormInput name="address2" title="Apt, suite, etc. (optional)" />
            <FormInput
              name="city"
              title="City"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="country"
              title="Country/Region"
              width="33%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="province"
              title="State"
              width="33%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="zip"
              title="Zip Code"
              width="33%"
              registration={{
                required: true,
              }}
            />
            <button type="submit" value="">
              Continue to Shipping
            </button>
          </form>
        </FormContext>
      </Section>
      {/* <Link type="submit" to="/checkout/shipping">Continue to shipping</Link> */}
    </Container>
  );
};

export default Info;

const Container = styled.div``;

const Section = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 0.8rem;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }
`;
