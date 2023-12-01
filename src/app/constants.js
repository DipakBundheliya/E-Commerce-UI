export const ITEM_PER_PAGE = 12;
export function discoutPrice(price, discountPercentage) {
  return Math.round(price * (1 - discountPercentage / 100));
}
