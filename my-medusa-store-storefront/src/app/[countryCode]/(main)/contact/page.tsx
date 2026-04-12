import { Metadata } from "next"
import { Heading, Text, Input, Button, Label, Container } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Liên hệ | Zang Storefront",
  description: "Liên hệ với chúng tôi để được hỗ trợ tốt nhất về các sản phẩm Medusa v2.",
}

export default function ContactPage() {
  return (
    <div className="py-12">
      <Container className="max-w-3xl py-12 px-8 mx-auto bg-ui-bg-base border border-ui-border-base rounded-xl shadow-elevation-card-rest">
        <div className="flex flex-col gap-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-y-2 border-b border-ui-border-base pb-6">
            <Heading level="h1" className="text-3xl-semi text-ui-fg-base">
              Liên hệ với chúng tôi
            </Heading>
            <Text className="text-ui-fg-subtle">
              Chúng tôi luôn sẵn sàng lắng nghe ý kiến và giải đáp thắc mắc của bạn.
            </Text>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col gap-y-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="full_name" className="txt-compact-medium text-ui-fg-subtle">Họ và tên</Label>
                <Input id="full_name" name="full_name" placeholder="Ví dụ: Đặng Đòn" required />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="email" className="txt-compact-medium text-ui-fg-subtle">Email</Label>
                <Input id="email" name="email" type="email" placeholder="email@example.com" required />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="subject" className="txt-compact-medium text-ui-fg-subtle">Tiêu đề</Label>
              <Input id="subject" name="subject" placeholder="Tôi cần hỗ trợ về đơn hàng..." />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="message" className="txt-compact-medium text-ui-fg-subtle">Nội dung tin nhắn</Label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="flex min-h-[80px] w-full rounded-md border border-ui-border-base bg-ui-bg-field px-3 py-2 text-sm text-ui-fg-base transition-colors placeholder:text-ui-fg-muted focus:outline-none focus:border-ui-border-interactive hover:bg-ui-bg-field-hover"
                placeholder="Nhập nội dung chi tiết tại đây..."
              />
            </div>

            <Button variant="primary" className="w-full md:w-fit px-8" size="large">
              Gửi thông tin
            </Button>
          </form>

          {/* Footer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-4 border-t border-ui-border-base">
            <div className="flex flex-col gap-y-2">
              <Text className="txt-medium-semi text-ui-fg-base underline">Trụ sở chính</Text>
              <Text className="txt-medium text-ui-fg-subtle">
                Khu đô thị Đại học Quốc gia, Dĩ An, Bình Dương.
              </Text>
            </div>
            <div className="flex flex-col gap-y-2 text-right md:text-left">
              <Text className="txt-medium-semi text-ui-fg-base underline">Kênh hỗ trợ</Text>
              <Text className="txt-medium text-ui-fg-subtle">support@zang-store.com</Text>
              <Text className="txt-medium text-ui-fg-subtle">(+84) 123 456 789</Text>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Back to Store Link */}
      <div className="mt-8 flex justify-center">
        <LocalizedClientLink href="/store" className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors">
          ← Quay lại cửa hàng
        </LocalizedClientLink>
      </div>
    </div>
  )
}
