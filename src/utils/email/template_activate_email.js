export const activate_email = (userName, loginUrl) =>
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>...</head>
    <body><!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Confirmed</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #007BFF;
                font-size: 24px;
                margin: 0;
            }
            .content {
                text-align: center;
            }
            .content p {
                font-size: 15px;
                line-height: 1.6;
                margin: 10px 0;
            }
            .button {
                display: inline-block;
                background-color: #007BFF;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Account Confirmed Successfully!</h1>
            </div>
            <div class="content">
                <p>Hi <strong>{{userName}}</strong>,</p>
                <p>Your account has been confirmed successfully. You can now log in and start exploring!</p>
                <a href="{{loginUrl}}" class="button">Go to Login</a>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to contact our support team.</p>
                <p>Thank you for joining us!</p>
            </div>
        </div>
    </body>
    </html>
    </body>
    </html>
    `
    .replace("{{userName}}", userName)
    .replace("{{loginUrl}}", loginUrl);
