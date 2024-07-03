<?php

require 'config/PHPMailer/src/Exception.php';
require 'config/PHPMailer/src/PHPMailer.php';
require 'config/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailController {

    public function __construct() {
    }
    public static function sendEmail($to, $toName, $subject, $body, $altBody = '') {
        $mail = new PHPMailer(true);

        try {
            $mail->SMTPDebug = 0; // Or use 3 for more verbose output
            $mail->Debugoutput = 'html';
        
            //Server settings
            $mail->isSMTP();
            // $mail->Host = 'smtp.mailgun.org';
            // $mail->SMTPAuth = true;
            // $mail->Username = 'postmaster@sandbox5d24865791104fa495408d819056a944.mailgun.org'; // Your Mailgun SMTP login
            // $mail->Password = 'd80fdb6a2fab775f88c6a08c2da842e4-623e10c8-4950d78c'; // Your Mailgun SMTP password
            // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use STARTTLS for TLS encryption
            // $mail->Port = 587; // Use 465 for SSL

            $mail->Host = 'smtp.mail.me.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'umirahmed@icloud.com'; // Replace with your Brevo (Sendinblue) email
            $mail->Password = 'phaf-ozbz-drfa-qgdv'; // Replace with your Brevo (Sendinblue) SMTP key
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use STARTTLS for TLS encryption
            $mail->Port = 587; // Use 465 for SSL

            // Recipients
            $mail->setFrom('umirahmed@icloud.com', 'CineTech Cinema');
            $mail->addAddress($to, $toName);

            // Content
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = $altBody;

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log('Mailer Error: ' . $mail->ErrorInfo);
            return false;
        }
    }
}
