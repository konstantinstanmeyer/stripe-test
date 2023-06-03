import { GetServerSideProps, NextPage } from 'next'
import Stripe from 'stripe';

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? ' ', {
    apiVersion: "2022-11-15"
  })

  console.log("yes")
  const response = await stripe.prices.list({
    expand: ['data.product']
  })

  const prices = response.data.filter((price: any) => {
    return price.active;
  })

  return {
    props: {
      prices,
    }
  }
}

type Props = {
  prices: Stripe.Price[]
}

const Home: NextPage<Props> = ({ prices }) => {

  console.log(prices);
  return (
    <div>
      hello
    </div>
  )
}


export default Home;