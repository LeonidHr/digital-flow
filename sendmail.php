<$php 
  use PHPMailer/PHPMailer/PHPMailer;
  use PHPMailer/PHPMailer/Exception;

  require 'phpmailer/scr/Exception.php';
  require 'phpmailer/scr/PHPMailer.php';
  
  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->isHTML(true);

  $mail->setFrom('lkhristenok@gmail.com', 'user');
  $mail->addAdress('hristenokleonid@gmail.com');
  $mail->Subject('Новый заказ!');


  $body = '<h1>Новый заказ!</h1>';

  if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }

  if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
  }

  if(trim(!empty($_POST['message']))) {
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
  }


  $mail->Body = $body;

  if(!$mail->send()) {
    $message = 'Ошибка';
  } else {
    'Данные отправлены';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>







