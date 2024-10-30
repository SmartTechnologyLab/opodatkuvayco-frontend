/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HealthResponse {
  status: 'UP'
}

export enum ReportTypeEnum {
  Extended = 'extended',
  Normal = 'normal'
}

export enum FileTypeEnum {
  Json = 'json',
  Xml = 'xml'
}

export enum StockExchangeEnum {
  FreedomFinance = 'freedom_finance',
  Ibkr = 'ibkr'
}

export interface TransactionDetails {
  /** @format date-time */
  date: string
  price: number
  sum: number
  commission: number
  rate: number
  uah: number
}

export interface Deal {
  id: symbol
  percent: number
  purchase: TransactionDetails
  quantity: number
  sale: TransactionDetails
  ticker: string
  total: number
}

export interface DealReport {
  total: number
  totalTaxFee: number
  totalMilitaryFee: number
  deals: Deal
}

export interface ReportResponse {
  deals: DealReport
}
