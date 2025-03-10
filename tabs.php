    <div class="solar-ppa-savings">
        <input name="nav" type="radio" class="nav home-radio" id="home" checked="checked" />
        <div class="page home-page">
            <div class="page-contents">
                <?php include('sheet-1.php'); ?>
            </div>
        </div>
        <label class="nav" for="home">
            <span>25 Year Return</span>
        </label>

        <input name="nav" type="radio" class="about-radio" id="about" />
        <div class="page about-page">
            <div class="page-contents">
                <?php include('sheet-5.php'); ?>
            </div>
        </div>
        <label class="nav" for="about">
            <span>Monthly Return</span>
        </label>
    </div>