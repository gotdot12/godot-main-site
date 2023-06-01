import { MultiPurchase } from '../sections';

const purchase = () => (
  <div className="purchase-page bg-primary-black overflow-hidden" style={{ width: '100%', minHeight: "100vh" }}>
    <div className="relative">
      <div className="gradient-03 z-0" />
      <MultiPurchase />
    </div>
  </div>
);

export default purchase;
