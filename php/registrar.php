<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/libs/vendor/autoload.php';

// Cargar Dotenv para variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


// Configuración de la base de datos usando variables de entorno
$db_host_vc_ga = $_ENV['DB_HOST'];
$db_name_vc_ga = $_ENV['DB_NAME'];
$db_user_vc_ga = $_ENV['DB_USER'];
$db_pass_vc_ga = $_ENV['DB_PASS'];

// Función para generar clave alfanumérica segura
function generar_clave_segura_vc_ga($longitud_vc_ga = 16) {
    $caracteres_vc_ga = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $clave_vc_ga = '';
    $max_vc_ga = strlen($caracteres_vc_ga) - 1;
    
    for ($i_vc_ga = 0; $i_vc_ga < $longitud_vc_ga; $i_vc_ga++) {
        $clave_vc_ga .= $caracteres_vc_ga[random_int(0, $max_vc_ga)];
    }
    
    return $clave_vc_ga;
}

// Sanitizar y validar datos del formulario
$inputs_vc_ga = filter_input_array(INPUT_POST, [
    'name' => FILTER_SANITIZE_STRING,
    'email' => FILTER_SANITIZE_EMAIL,
    'message' => FILTER_SANITIZE_STRING
]);

// Validación de campos obligatorios
if (empty($inputs_vc_ga['name']) || !filter_var($inputs_vc_ga['email'], FILTER_VALIDATE_EMAIL) || empty($inputs_vc_ga['message'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Por favor, completa todos los campos correctamente.'
    ]);
    exit;
}

// Generar la clave temporal SOLO si la validación es exitosa
$clave_temporal_vc_ga = generar_clave_segura_vc_ga(12); // Reducida a 12 caracteres para mejor legibilidad

try {
    // Conexión a la base de datos
    $pdo_vc_ga = new PDO("mysql:host=$db_host_vc_ga;dbname=$db_name_vc_ga;charset=utf8", $db_user_vc_ga, $db_pass_vc_ga);
    $pdo_vc_ga->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si el usuario ya existe
    $stmt_vc_ga = $pdo_vc_ga->prepare("SELECT id_usuario_vc_ga FROM td_usuarios_vc_ga WHERE correo_electronico_vc_ga = ?");
    $stmt_vc_ga->execute([$inputs_vc_ga['email']]);
    $usuario_existente_vc_ga = $stmt_vc_ga->fetch();

    // Guardar la clave en texto plano para mostrar en el correo
    $clave_para_correo_vc_ga = $clave_temporal_vc_ga;
    
    // Hashear la clave para guardar en la base de datos
    $clave_para_db_vc_ga = password_hash($clave_temporal_vc_ga, PASSWORD_DEFAULT);

    if ($usuario_existente_vc_ga) {
        // Actualizar usuario existente
        $stmt_vc_ga = $pdo_vc_ga->prepare("UPDATE td_usuarios_vc_ga SET 
            clave_vc_ga = ?,
            clave_temporal_vc_ga = TRUE,
            nombre_completo_vc_ga = ?
            WHERE id_usuario_vc_ga = ?");
        
        $stmt_vc_ga->execute([
            $clave_para_db_vc_ga,
            $inputs_vc_ga['name'],
            $usuario_existente_vc_ga['id_usuario_vc_ga']
        ]);
    } else {
        // Insertar nuevo usuario con todos los campos necesarios
        $stmt_vc_ga = $pdo_vc_ga->prepare("INSERT INTO td_usuarios_vc_ga (
            id_departamento_vc_ga, 
            id_rol_vc_ga, 
            id_cargo_vc_ga, 
            nombre_completo_vc_ga, 
            cedula_vc_ga,
            rif_vc_ga,
            fecha_nacimiento_vc_ga,
            correo_electronico_vc_ga, 
            telefono_vc_ga,
            clave_vc_ga, 
            clave_temporal_vc_ga,
            status_vc_ga,
            fecha_ingreso_vc_ga
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        
        $stmt_vc_ga->execute([
            5, // id_departamento_vc_ga (Tecnología)
            1, // id_rol_vc_ga (Administrador)
            5, // id_cargo_vc_ga (Desarrollador)
            $inputs_vc_ga['name'],
            '0', // cedula_vc_ga - valor por defecto
            null, // rif_vc_ga - puede ser null
            null, // fecha_nacimiento_vc_ga - puede ser null
            $inputs_vc_ga['email'],
            null, // telefono_vc_ga - puede ser null
            $clave_para_db_vc_ga,
            TRUE,
            'Trabajando'
        ]);
        
        // Obtener el ID del usuario recién insertado
        $nuevo_usuario_id = $pdo_vc_ga->lastInsertId();
        
        // Crear salario base de $12 para el nuevo usuario
        $stmt_salario = $pdo_vc_ga->prepare("INSERT INTO td_salario_historico_vc_ga (id_usuario_vc_ga, salario_vc_ga) VALUES (?, ?)");
        $stmt_salario->execute([$nuevo_usuario_id, 12]);
    }

    // Configurar y enviar email
    $mail_vc_ga = new PHPMailer(true);
    $mail_vc_ga->SMTPDebug = SMTP::DEBUG_OFF;
    $mail_vc_ga->isSMTP();
    $mail_vc_ga->Host = 'smtp.gmail.com';
    $mail_vc_ga->SMTPAuth = true;
    $mail_vc_ga->Username = $_ENV['MAIL_USERNAME'];
    $mail_vc_ga->Password = $_ENV['MAIL_PASSWORD'];
    $mail_vc_ga->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail_vc_ga->Port = 587;

    $mail_vc_ga->setFrom('info@baldox.com', 'Web Baldox');
    $mail_vc_ga->addAddress($inputs_vc_ga['email']);
    $mail_vc_ga->Subject = "Registro exitoso - Clave temporal";
    
    $mail_vc_ga->isHTML(true);
    $mail_vc_ga->Body = "
        <h2>¡Registro exitoso!</h2>
        <p><strong>Nombre:</strong> {$inputs_vc_ga['name']}</p>
        <p><strong>Email:</strong> {$inputs_vc_ga['email']}</p>
        <p><strong>Mensaje:</strong><br>{$inputs_vc_ga['message']}</p>
        <p><strong>Tu clave temporal es:</strong> <code>{$clave_para_correo_vc_ga}</code></p>
        <p>Esta clave es válida por 24 horas. Por favor, cámbiala después de iniciar sesión.</p>
    ";

    $mail_vc_ga->send();

    echo json_encode([
        'success' => true,
        'message' => '¡Registro exitoso! Se ha enviado una clave temporal a tu correo.'
    ]);

} catch (PDOException $e_vc_ga) {
    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos: ' . $e_vc_ga->getMessage()
    ]);
} catch (Exception $e_vc_ga) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar el correo: ' . $e_vc_ga->getMessage()
    ]);
}