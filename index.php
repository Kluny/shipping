<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Shipping</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="logic.js"></script>
    <script type="text/javascript" src="ui.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>

<div class="container">
<div class="col1">
    <form id="main_form">
        <?php require_once 'capital_section.php'; ?>
        <?php require_once 'fixed_costs_section.php'; ?>
        <?php require_once 'tax_section.php'; ?>
        <?php require_once 'variable_costs_section.php'; ?>
        <section>
            <input class="submit" type="submit" value="Calculate">
        </section>
    </form>
</div><!-- col1 -->
<div class="col2">
    <?php require_once 'results.php'; ?>
</div><!-- col2 -->
</div><!-- container -->
<footer>
    More info at <a href="https://github.com/Kluny/shipping">Github.</a>
</footer>

</body>

</html>