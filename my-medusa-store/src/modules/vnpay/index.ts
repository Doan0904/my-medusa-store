import VNPayProviderService from "./service"
import { ModuleProviderExports } from "@medusajs/framework/types"

const services = [VNPayProviderService]

export default {
  services,
} as ModuleProviderExports
