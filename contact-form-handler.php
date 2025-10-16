<?php
// contact-form-handler.php
// Simple PHP form handler for TimeTech contact forms

// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Configuration
$config = [
    'to_email' => 'afkhan.fardeen@gmail.com', // Your email address
    'from_email' => 'noreply@time-tech.co', // Your domain email
    'subject_prefix' => '[TimeTech Contact]',
    'max_file_size' => 5 * 1024 * 1024, // 5MB max file size
    'allowed_extensions' => ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png']
];

// Function to sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to send email
function sendEmail($to, $subject, $message, $headers = '') {
    return mail($to, $subject, $message, $headers);
}

// Handle contact form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['form_type'])) {
    
    $response = ['success' => false, 'message' => ''];
    
    try {
        // Get form type
        $formType = sanitizeInput($_POST['form_type']);
        
        if ($formType === 'contact') {
            // Contact form processing
            $firstName = sanitizeInput($_POST['firstName']);
            $lastName = sanitizeInput($_POST['lastName']);
            $email = sanitizeInput($_POST['email']);
            $phone = sanitizeInput($_POST['phone']);
            $company = sanitizeInput($_POST['company']);
            $country = sanitizeInput($_POST['country']);
            $subject = sanitizeInput($_POST['subject']);
            $message = sanitizeInput($_POST['message']);
            $newsletter = isset($_POST['newsletter']) ? 'Yes' : 'No';
            
            // Validation
            if (empty($firstName) || empty($lastName) || empty($email) || empty($country) || empty($subject) || empty($message)) {
                throw new Exception('All required fields must be filled.');
            }
            
            if (!validateEmail($email)) {
                throw new Exception('Please enter a valid email address.');
            }
            
            // Prepare email content
            $emailSubject = $config['subject_prefix'] . ' ' . $subject;
            $emailMessage = "
                <html>
                <head>
                    <title>New Contact Form Submission</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #01898c; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background: #f9f9f9; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #01898c; }
                        .value { margin-top: 5px; }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h2>New Contact Form Submission</h2>
                        </div>
                        <div class='content'>
                            <div class='field'>
                                <div class='label'>Name:</div>
                                <div class='value'>{$firstName} {$lastName}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Email:</div>
                                <div class='value'>{$email}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Phone:</div>
                                <div class='value'>{$phone}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Company:</div>
                                <div class='value'>{$company}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Country:</div>
                                <div class='value'>{$country}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Subject:</div>
                                <div class='value'>{$subject}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Message:</div>
                                <div class='value'>{$message}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Newsletter Subscription:</div>
                                <div class='value'>{$newsletter}</div>
                            </div>
                            <div class='field'>
                                <div class='label'>Submitted:</div>
                                <div class='value'>" . date('Y-m-d H:i:s') . "</div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            ";
            
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=UTF-8\r\n";
            $headers .= "From: {$config['from_email']}\r\n";
            $headers .= "Reply-To: {$email}\r\n";
            
            // Send email
            if (sendEmail($config['to_email'], $emailSubject, $emailMessage, $headers)) {
                $response['success'] = true;
                $response['message'] = 'Message sent successfully! We\'ll get back to you within 24 hours.';
            } else {
                throw new Exception('Failed to send email. Please try again.');
            }
            
        } elseif ($formType === 'partner') {
            // Partner application form processing
            $companyName = sanitizeInput($_POST['companyName']);
            $website = sanitizeInput($_POST['website']);
            $industry = sanitizeInput($_POST['industry']);
            $companySize = sanitizeInput($_POST['companySize']);
            $companyDescription = sanitizeInput($_POST['companyDescription']);
            $contactName = sanitizeInput($_POST['contactName']);
            $jobTitle = sanitizeInput($_POST['jobTitle']);
            $email = sanitizeInput($_POST['email']);
            $phone = sanitizeInput($_POST['phone']);
            $partnershipType = sanitizeInput($_POST['partnershipType']);
            $targetMarket = sanitizeInput($_POST['targetMarket']);
            $geographicCoverage = sanitizeInput($_POST['geographicCoverage']);
            $partnershipGoals = sanitizeInput($_POST['partnershipGoals']);
            $whyTimeTech = sanitizeInput($_POST['whyTimeTech']);
            $technicalExpertise = isset($_POST['technicalExpertise']) ? implode(', ', $_POST['technicalExpertise']) : '';
            $agreeTerms = isset($_POST['agreeTerms']) ? 'Yes' : 'No';
            
            // Validation
            if (empty($companyName) || empty($contactName) || empty($email) || empty($phone) || empty($jobTitle) || empty($industry) || empty($companySize) || empty($companyDescription) || empty($partnershipType) || empty($targetMarket) || empty($geographicCoverage) || empty($partnershipGoals) || empty($whyTimeTech)) {
                throw new Exception('All required fields must be filled.');
            }
            
            if (!validateEmail($email)) {
                throw new Exception('Please enter a valid email address.');
            }
            
            if ($agreeTerms !== 'Yes') {
                throw new Exception('You must agree to the terms and conditions.');
            }
            
            // Prepare email content
            $emailSubject = $config['subject_prefix'] . ' Partner Application - ' . $companyName;
            $emailMessage = "
                <html>
                <head>
                    <title>New Partner Application</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #01898c; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background: #f9f9f9; }
                        .section { margin-bottom: 25px; padding: 15px; background: white; border-left: 4px solid #01898c; }
                        .section-title { font-weight: bold; color: #01898c; margin-bottom: 10px; font-size: 16px; }
                        .field { margin-bottom: 10px; }
                        .label { font-weight: bold; color: #666; }
                        .value { margin-top: 3px; }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h2>New Partner Application</h2>
                        </div>
                        <div class='content'>
                            <div class='section'>
                                <div class='section-title'>Company Information</div>
                                <div class='field'>
                                    <div class='label'>Company Name:</div>
                                    <div class='value'>{$companyName}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Website:</div>
                                    <div class='value'>{$website}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Industry:</div>
                                    <div class='value'>{$industry}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Company Size:</div>
                                    <div class='value'>{$companySize}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Company Description:</div>
                                    <div class='value'>{$companyDescription}</div>
                                </div>
                            </div>
                            
                            <div class='section'>
                                <div class='section-title'>Contact Information</div>
                                <div class='field'>
                                    <div class='label'>Contact Name:</div>
                                    <div class='value'>{$contactName}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Job Title:</div>
                                    <div class='value'>{$jobTitle}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Email:</div>
                                    <div class='value'>{$email}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Phone:</div>
                                    <div class='value'>{$phone}</div>
                                </div>
                            </div>
                            
                            <div class='section'>
                                <div class='section-title'>Partnership Details</div>
                                <div class='field'>
                                    <div class='label'>Partnership Type:</div>
                                    <div class='value'>{$partnershipType}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Target Market:</div>
                                    <div class='value'>{$targetMarket}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Geographic Coverage:</div>
                                    <div class='value'>{$geographicCoverage}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Technical Expertise:</div>
                                    <div class='value'>{$technicalExpertise}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Partnership Goals:</div>
                                    <div class='value'>{$partnershipGoals}</div>
                                </div>
                                <div class='field'>
                                    <div class='label'>Why TimeTech:</div>
                                    <div class='value'>{$whyTimeTech}</div>
                                </div>
                            </div>
                            
                            <div class='field'>
                                <div class='label'>Submitted:</div>
                                <div class='value'>" . date('Y-m-d H:i:s') . "</div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            ";
            
            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=UTF-8\r\n";
            $headers .= "From: {$config['from_email']}\r\n";
            $headers .= "Reply-To: {$email}\r\n";
            
            // Send email
            if (sendEmail($config['to_email'], $emailSubject, $emailMessage, $headers)) {
                $response['success'] = true;
                $response['message'] = 'Application submitted successfully! We\'ll contact you within 5-7 business days.';
            } else {
                throw new Exception('Failed to send email. Please try again.');
            }
        } else {
            throw new Exception('Invalid form type.');
        }
        
    } catch (Exception $e) {
        $response['success'] = false;
        $response['message'] = $e->getMessage();
    }
    
    echo json_encode($response);
    exit;
}

// If not a POST request, return error
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
?>
