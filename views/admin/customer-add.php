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
            <div class="col-span-12 mt-6">
                <div class="intro-y overflow-auto lg:overflow-visible mt-2">
                    <div class="grid grid-cols-12 gap-6">
                        <!-- BEGIN: Profile Menu -->
                        <div class="col-span-12 md:col-span-6 xl:col-span-5">
                            <!-- BEGIN: Personal Information -->
                            <div class="intro-y box lg:mt-5">
                                <div class="flex items-center p-5 border-b border-red2 dark:border-darkmode-400">
                                    <h2 class="font-medium text-base mr-auto">
                                        Personal Information
                                    </h2>
                                </div>
                                <div class="p-5">
                                    <div>
                                        <label for="update-profile-form-8" class="form-label">Account Type</label>
                                        <select id="update-profile-form-8" class="form-select">
                                            <option>Savings Account</option>
                                            <option>Current Account</option>
                                            <option>Fixed Deposit Account</option>
                                            <option>Salary Account</option>
                                            <option>Recuring Deposit Account</option>
                                        </select>
                                    </div>
                                    <div class="mt-3">
                                        <label for="update-profile-form-11" class="form-label">Name</label>
                                        <input id="update-profile-form-11" type="text" class="form-control"
                                            placeholder="Name" value="">
                                    </div>
                                    <div class="mt-3">
                                        <div class="flex gap-2">
                                            <div class="w-24">
                                                <label for="update-profile-form-11" class="form-label">Code</label>
                                                <select id="update-profile-form-2" data-search="true"
                                                    class="tom-select w-full">
                                                    <option value="376,,,AD">
                                                        AD +376
                                                    </option>
                                                    <option value="971,,,AE">
                                                        AE +971
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="flex-1">
                                                <label for="update-profile-form-11" class="form-label">Phone
                                                    Number</label>
                                                <input id="update-profile-form-11" type="text" class="form-control"
                                                    placeholder="Phone Number" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <label for="update-profile-form-6" class="form-label">Email</label>
                                        <input id="update-profile-form-6" type="email" class="form-control"
                                            placeholder="Email" value="">
                                    </div>
                                    <div class="mt-3">
                                        <label for="update-profile-form-9" class="form-label">Password</label>
                                        <input id="update-profile-form-9" type="Password" class="form-control"
                                            placeholder="Password">
                                    </div>
                                    <div class="mt-3">
                                        <label for="update-profile-form-9" class="form-label">Confirm Password</label>
                                        <input id="update-profile-form-9" type="Password" class="form-control"
                                            placeholder="Confirm Password">
                                    </div>
                                </div>
                            </div>
                            <!-- END: Personal Information -->
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-7 flex lg:block flex-col">
                            <!-- BEGIN: Display Information -->
                            <div class="intro-y box lg:mt-5">
                                <div class="flex items-center p-5 border-b border-red2">
                                    <h2 class="font-medium text-base mr-auto">
                                        Display Information
                                    </h2>
                                </div>
                                <div class="p-5">
                                    <div class="flex xl:flex-row flex-col">
                                        <div class="flex-1">
                                            <div class="grid grid-cols-12 gap-x-5">
                                                <div class="col-span-12">
                                                    <div>
                                                        <div class="grid grid-cols-2 gap-x-2 gap-y-3">
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">Date Of Birth</label>
                                                                <input type="text" class="datepicker form-control"
                                                                    data-single-mode="true">
                                                            </div>
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">Gender</label>
                                                                <select id="update-profile-form-2" data-search="true"
                                                                    class="form-select w-full">
                                                                    <option value="1">Male</option>
                                                                    <option value="2">Female</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">Marital Status</label>
                                                                <select id="update-profile-form-2" data-search="true"
                                                                    class="form-select w-full">
                                                                    <option value="1">Single</option>
                                                                    <option value="2">Married</option>
                                                                    <option value="2">Divorced</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">Monthly Income</label>
                                                                <input id="update-profile-form-4" type="number"
                                                                    class="form-control" placeholder="Monthly Income">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-span-12">
                                                    <div class="mt-3">
                                                        <label for="update-profile-form-2"
                                                            class="form-label">Address</label>
                                                        <input id="update-profile-form-4" type="text"
                                                            class="form-control" placeholder="Address">
                                                    </div>
                                                    <div class="mt-3">
                                                        <label for="update-profile-form-2"
                                                            class="form-label">Occupation</label>
                                                        <input id="update-profile-form-4" type="text"
                                                            class="form-control" placeholder="Occupation">
                                                    </div>
                                                    <div class="mt-3">
                                                        <div class="grid grid-cols-2 gap-x-2 gap-y-3">
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">City</label>
                                                                <input id="update-profile-form-4" type="number"
                                                                    class="form-control" placeholder="City">
                                                            </div>
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">State / Province</label>
                                                                <input id="update-profile-form-4" type="number"
                                                                    class="form-control" placeholder="State / Province">
                                                            </div>
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">Postal / Zip code</label>
                                                                <input id="update-profile-form-4" type="number"
                                                                    class="form-control"
                                                                    placeholder="Postal / Zip code">
                                                            </div>
                                                            <div>
                                                                <label for="update-profile-form-11"
                                                                    class="form-label">Marital Status</label>
                                                                <select id="update-profile-form-2" data-search="true"
                                                                    class="tom-select w-full">
                                                                    <option value="1">Single</option>
                                                                    <option value="2">Married</option>
                                                                    <option value="2">Divorced</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                                            <div
                                                class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                                    <img class="rounded-md" alt="Midone - HTML Admin Template"
                                                        src="dist/images/profile-15.jpg">
                                                    <div title="Remove this profile photo?"
                                                        class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                                                        <i data-lucide="x" class="w-4 h-4"></i>
                                                    </div>
                                                </div>
                                                <div class="mx-auto cursor-pointer relative mt-5">
                                                    <button type="button" class="btn btn-primary w-full">Change
                                                        Photo</button>
                                                    <input type="file"
                                                        class="w-full h-full top-0 left-0 absolute opacity-0">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary mt-3">Add Customer</button>
                            <!-- END: Display Information -->
                        </div>
                        <!-- END: Profile Menu -->
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- END: Content -->
    <?php include("includes/js-assets.php") ?>
</body>

</html>