<?php

use App\Models\Dev\Employees\Employees;

// check database connection
require_once __DIR__ . '/../../../core/bootstrap.php';



$conn = null;
$conn = checkDbConnection($conn);

// make use of classes
if(isset($_GET['filter'])){
    $allowedFilters = ['birthday_by_month', 'new', 'department'];
    if (!in_array($_GET['filter'], $allowedFilters, true)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Invalid filter']));
    }
    $filter = $_GET['filter'];
    $val = new Employees($conn);
    $val->filter = "";
    // birthday
    $filterMap = [
        'birthday_by_month' => 'employee_birthday',
        'new'               => 'employee_start_work_date',
        'department'        => 'department_aid',
    ];
    $val->filter = $filterMap[$filter] ?? '';
    if ($filter === 'department') {
        $val->employee_department_id = $_GET["department_id"] ?? "";
    }
    $query = $val->readFilter();
    checkQuery($query, "Invalid Filter (employee)");
    http_response_code(200); // OK
    getQueriedData($query);
}


checkEndpoint();
