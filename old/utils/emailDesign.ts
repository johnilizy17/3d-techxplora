export function SendGroupNotificationEmail(code: string, time: string, start: string) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Access - Your Learning Journey Awaits</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  
  <!-- Main Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        
        <!-- Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🎯 Ready for Your Quiz?
              </h1>
              <p style="margin: 10px 0 0; color: #e2e8f0; font-size: 16px; line-height: 1.5;">
                Test your knowledge and unlock new achievements
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td class="content" style="padding: 40px 30px;">
              
              <!-- Welcome -->
              <div style="text-align: center; margin-bottom: 35px;">
                <h2 style="margin: 0 0 15px; color: #1a202c; font-size: 24px; font-weight: 600;">
                  Welcome Back, Learner! 👋
                </h2>
                <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                  Your personalized quiz is ready and waiting. Choose your preferred way to access it below and continue your learning journey.
                </p>
              </div>
              
              <!-- Access Box -->
              <div style="background-color: #f7fafc; border-radius: 10px; padding: 30px; margin-bottom: 30px; border: 2px solid #e2e8f0;">
                
                <h3 style="margin: 0 0 20px; color: #2d3748; font-size: 18px; font-weight: 600; text-align: center;">
                  🚀 Choose Your Access Method
                </h3>
                
                <!-- Option 1 -->
                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                  <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span style="background-color: #3182ce; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px;">1</span>
                    <h4 style="margin: 0; color: #2d3748; font-size: 16px; font-weight: 600;">Copy Access Code</h4>
                  </div>
                  <p style="margin: 0 0 15px; color: #4a5568; font-size: 14px; line-height: 1.5;">
                    Copy this unique code and enter it on our quiz platform:
                  </p>
                  <div class="code-box" style="background-color: #edf2f7; border: 2px dashed #cbd5e0; border-radius: 6px; padding: 15px; text-align: center; position: relative;">
                    <code style="font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold; color: #2b6cb0; letter-spacing: 2px;">
                      ${code}
                    </code>
                    <div style="margin-top: 10px;">
                      <small style="color: #718096; font-size: 12px;">✨ Click to select and copy</small>
                    </div>
                  </div>
                </div>
                
                <!-- Divider -->
                <div style="text-align: center; margin: 25px 0; position: relative;">
                  <div style="height: 1px; background-color: #e2e8f0;"></div>
                  <span style="background-color: #f7fafc; color: #718096; padding: 0 15px; font-size: 14px; font-weight: 500; position: relative; top: -10px;">OR</span>
                </div>
                
                <!-- Option 2 -->
                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
                  <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span style="background-color: #38a169; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px;">2</span>
                    <h4 style="margin: 0; color: #2d3748; font-size: 16px; font-weight: 600;">Direct Access</h4>
                  </div>
                  <p style="margin: 0 0 20px; color: #4a5568; font-size: 14px; line-height: 1.5;">
                    Click the button below for instant access to your quiz:
                  </p>
                  <div style="text-align: center;">
                    <a href="https://techxplora.vercel.app/dashboard/quizzes/join?code=${code}" 
                       class="cta-button"
                       style="display: inline-block; background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      🎯 Start Quiz Now
                    </a>
                  </div>
                  <div style="text-align: center; margin-top: 12px;">
                    <small style="color: #718096; font-size: 12px;">
                      ⏱️ Estimated time: ${code} minutes
                    </small>
                    <small style="color: #718096; font-size: 12px;">
                      ⏱️ Staring date: ${start} minutes
                    </small>
                  </div>
                </div>
                
              </div>
              
              <!-- Support -->
              <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                  Need help? We're here for you! 🤝
                </p>
                <a href="mailto:support@techxplora.com" style="color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 14px;">
                  📧 support@techxplora.com
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a202c; padding: 30px; text-align: center;">
              <p style="margin: 0 0 15px; color: #a0aec0; font-size: 14px; line-height: 1.5;">
                Keep learning, keep growing! 🌱<br>
                This quiz expires in <strong style="color: #4299e1;">7 days</strong>
              </p>
              <p style="margin: 0; color: #718096; font-size: 12px;">
                © 2025 Your Learning Platform. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
  <!-- Mobile Responsiveness -->
  <style>
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .content {
        padding: 20px !important;
      }
      .cta-button {
        padding: 14px 24px !important;
        font-size: 15px !important;
        display: block !important;
        width: 100% !important;
      }
      .code-box {
        font-size: 16px !important;
      }
    }
  </style>
  
</body>
</html>
    `
}

export function SendOptEmail(code: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Your OTP Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <!-- Wrapper Table -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 75, 238, 0.1); overflow: hidden;">
                    
                    <!-- Header Section -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #004BEE 0%, #0066FF 100%); padding: 40px 30px; text-align: center;">
                            <!-- Logo/Brand Area -->
                            <div style="margin-bottom: 20px;">
                                <span style="color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">TechXplora</span>
                            </div>
                            
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.2;">Your Verification Code</h1>
                            <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; line-height: 1.5;">Use the code below to complete your action. This code is valid for 10 minutes.</p>
                        </td>
                    </tr>
                    
                    <!-- OTP Section -->
                    <tr>
                        <td style="padding: 50px 30px; text-align: center;">
                            <h2 style="color: #333333; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; line-height: 1.3;">Your OTP Code</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Enter this code in the app or website to proceed.
                            </p>
                            
                            <!-- OTP Code Display -->
                            <div style="display: inline-block; background-color: #f1f3f6; border-radius: 8px; padding: 20px 40px; margin: 20px 0; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #004BEE;">
                                ${code}
                            </div>

                            <p style="color: #888888; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                                If you did not request this code, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8f9fa; text-align: center;">
                            <p style="color: #888888; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">
                                <strong style="color: #333333;">TechXplora</strong><br>
                                123 Business Street, Suite 100<br>
                                City, State 12345
                            </p>
                            <p style="color: #888888; font-size: 12px; margin: 20px 0 0 0; line-height: 1.4;">
                                You received this email because you requested a verification code.<br>
                                <a href="#" style="color: #004BEE; text-decoration: none;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`

}