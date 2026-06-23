import BalanceCard from "@/components/balance-card/BalanceCard.tsx"

function Home() {
  return (
    <section className="mx-auto w-full max-w-lg">
      <BalanceCard titular="Breimer E. Correa T." balance="$ 50,700.00" currency="USD" />
    </section>
  )
}

export default Home
