<!DOCTYPE html>
<html lang="en" class="light" id="important">
<!-- BEGIN: Head -->

<head>
    <?php include("includes/head-assets.php") ?>
</head>
<!-- END: Head -->

<body class="py-5">

    <!-- Start Preloader Area -->
    <?php include("includes/preloader.php") ?>
    <!-- End Preloader Area -->

    <?php include("includes/navigation.php") ?>
    <!-- BEGIN: Content -->
    <div class="content">
        <div class="grid grid-cols-12 gap-6">
            <div class="lg:col-start-3 col-span-12 lg:col-span-8 flex lg:block flex-col mt-6">
                <div class="intro-y overflow-auto lg:overflow-visible mt-2">
                    <!-- BEGIN: Personal Information -->
                    <div class="intro-y box lg:mt-5">

                        <div class="flex items-center p-5 border-b border-red2 dark:border-darkmode-400">
                            <h2 class="font-medium text-base mr-auto">
                                Add New Billings
                            </h2>
                        </div>
                        <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label for="update-profile-form-8" class="form-label">User</label>
                                <select id="update-profile-form-8" class="tom-select">
                                    <option value="same">John Doe (1212334334)</option>
                                    <option value="others">Other Banks</option>
                                    <option value="crypto">Cryptocurrency</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="cashApp">Cash App</option>
                                </select>
                            </div>
                            <div>
                                <label for="update-profile-form-11" class="form-label">Service Provider</label>
                                <select id="update-profile-form-8" class="tom-select">
                                    <option value="same">DSTV</option>
                                    <option value="others">Other Banks</option>
                                    <option value="crypto">Cryptocurrency</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="cashApp">Cash App</option>
                                </select>
                            </div>
                            <div>
                                <label for="update-profile-form-11" class="form-label">Package</label>
                                <select id="update-profile-form-8" class="form-select">
                                    <option value="same">Premium</option>
                                    <option value="others">Other Banks</option>
                                    <option value="crypto">Cryptocurrency</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="cashApp">Cash App</option>
                                </select>
                            </div>
                            <div>
                                <label for="update-profile-form-11" class="form-label">Amount</label>
                                <input id="update-profile-form-11" type="number" class="form-control"
                                    placeholder="Amount" value="" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button type="button" class="btn btn-primary mt-3">Add Billings</button>
                    </div>
                    <!-- END: Personal Information -->
                </div>

            </div>
        </div>
    </div>
    <!-- END: Content -->
    <?php include("includes/js-assets.php") ?>
</body>

</html>