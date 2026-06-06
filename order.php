<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect POST data
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));

    // Check if fields are filled
    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo "Пожалуйста, заполните все поля.";
        exit;
    }

    // Email configuration
    $recipient = "alisanbakir1@gmail.com"; 
    
    // Subject
    $subject = "Новый заказ: Натуральное Зеленое Мыло-Шампунь";

    // Email content
    $email_content = "Новый заказ с сайта!\n\n";
    $email_content .= "Имя клиента: $name\n";
    $email_content .= "Телефон: $phone\n";

    // Email headers
    $email_headers = "From: Заказы <orders@yoursite.com>\r\n";
    $email_headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Redirect to success page
        header("Location: success.html");
        exit;
    } else {
        http_response_code(500);
        echo "К сожалению, произошла ошибка при отправке заявки.";
    }
} else {
    http_response_code(403);
    echo "Произошла ошибка, попробуйте еще раз.";
}
?>
