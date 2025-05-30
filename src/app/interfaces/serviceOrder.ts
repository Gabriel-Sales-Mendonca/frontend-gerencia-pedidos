export interface IServiceOrder {
  id: number
  location_id: number
  destination_id: number | null
  order_id: number
  product_id: string
  location: { name: string }
  destinationLocation?: { name: string } | null
  location_start_date?: Date
  location_delivery_date?: Date
}