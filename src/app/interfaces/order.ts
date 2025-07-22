import { IProduct } from "./product"

export interface IGroupedOrder {
  order_id: number
  company_id: number
  company_name: string
  delivery_date: string | null
  qtd_product: number
  expired: boolean
  expiresInAWeek: boolean,
  finished: boolean | undefined
}

export interface IOrderCreate {
  order_id: number
  company_id: number
  products: IProduct[]
  delivery_date: string
}