
import OpenAI from 'openai';
import { stringify } from 'openai/internal/qs/stringify.mjs';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: "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"// process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
  
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

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
 - Đơn 259k freeship 40k`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-4o-mini",
    });

    const response = completion.choices[0]?.message?.content || 
      "Xin lỗi, tôi không hiểu, nếu có vấn đề gì vui lòng gọi Hotline 0902559502 ạ.";

    res.status(200).json({ response });

  }catch (error) {
    // Log the entire error to console for detailed debugging
    console.error('ng Error generating AI response:', error);

    // Respond with a 500 error and the error message (in development only)
    res.status(500).json({ 
      error: 'ng Failed to generate response:' +stringify(error),
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
} 

  // catch (error) {
  //   console.error('ng Error generating AI response:', error);
  //   res.status(500).json({ 
  //     error: ' ng Failed to generate response',
  //     message: stringify(error) //process.env.NODE_ENV === 'development' ? error.message : undefined
  //   });
  // }
}
 