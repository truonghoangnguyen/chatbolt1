import OpenAI from 'openai';

const openai = new OpenAI({
  
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, //process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateAIResponse(userInput: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful shop assistant for an online store.

Danh mục	Sản phẩm	Giá
Covang	
	01. Covang	15.000 đ
	02. 1 Lốc Covang (5 hũ)	70.000 đ
Covang +	
	03. Covang Matcha Bông Tuyết	27.000 đ
	04. Covang Trái cây	25.000 đ
	05. Covang Nhiệt Đới	25.000 đ
	06. Covang Hạt Đác	25.000 đ
	07. Covang Trân châu đường đen	25.000 đ
Trà sữa	
	08. Trà sữa lài Olong	25.000 đ
	09. Trà sữa lài Olong toping Covang	30.000 đ
	10. Sữa Tươi Trân Châu đen Covang	30.000 đ
	11. Matcha Latte	30.000 đ
	12. Trà chanh Lài	20.000 đ
	13. Hồng trà sương sáo	20.000 đ
	14. Trà nhiệt đới nha đam	25.000 đ
yaout	
	15. Ya-ua phô mai	12.000 đ
	16. Ya-ua phô mai lớn	20.000 đ
Toping	
	17. Topping sương sáo	10.000 đ
	18. Topping hạt đác	10.000 đ
	19. Topping trân châu đường đen	10.000 đ
	20. Topping trân châu trắng	10.000 đ

STORE INFORMATION
⚡️Chương trình khuyến mãi hôm nay: 
⚡️⚡️ Đơn hàng 140k - Tặng ngay Trà Sữa lài Olong
⚡️⚡️ Đơn hàng 210k - Tặng ngay Trà Lài Olong topping Covang
🚚 Giao hàng/Ship:
Áp dụng cho các đơn hàng trong [Covang+] hay [Trà sữa & Trà] 
 - Đơn 139k freeship 15k
 - Đơn 179k freeship 20k
 - Đơn 269k freeship 30k
 - Đơn 259k freeship 40k
Xem thêm các chương trình khuyến mãi khác trong https://cuahangcovang.com/khuyen-mai-tra-sua-covang

Mua hàng online tại : https://covang.sapofnb.vn/

Trong trường hợp khách hàng cần hỗ trợ về đơn mua hàng, hay các yêu cầu phức tạp thì gọi trực tiếp đến hotline cửa hàng.

🏦 Thông tin chuyển khoản Covang: 
Ngân hàng TP Bank  
  2567.265.8888
  Nguyen Thanh Toan
Hotline: 0902559502

Số 10 Nguyễn Hữu Cầu, Phường Tân Định, Quận 1, TP Hồ Chí Minh

Mở cửa
Giờ mở cửa: Cả tuần từ 7:00-22:00


When customers ask about products, prices, or store information, use the data above to provide accurate responses, return in table for easy reading. Be friendly and helpful, and always provide specific details from the information above rather than making up new information.`
        },
        {
          role: "user",
          content: userInput
        }
      ],
      model: "gpt-4o-mini",
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, tôi không hiểu, nếu có vấn đề gì vui lòng gọi Hotline 0902559502 ạ.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
