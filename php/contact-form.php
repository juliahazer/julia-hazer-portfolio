<?php

$first_name = strip_tags(htmlspecialchars($_POST['first_name']));
$last_name = strip_tags(htmlspecialchars($_POST['last_name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['comment']));

// Create the email and send the message
$to = 'juliahazer@yahoo.com'; 
$email_subject = "Website Contact Form: $first_name $last_name";
$email_body = "You have received a new message from your website contact form.\n\n
	Here are the details:\n\n
	Name: $first_name $last_name\n\n
	Email: $email\n\n
	Phone: $phone\n\n
	Message:\n$message";
$headers = "From: noreply@yahoo.com\n";
$headers .= "Reply-To: $email";	

//REMOVE ECHOs ONCE TEST FORM ON SMTP SERVER
echo $to;
echo $headers;
echo $email_subject;
echo $email_body;

mail($to,$email_subject,$email_body,$headers);
return true;

?>