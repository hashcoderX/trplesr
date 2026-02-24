<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('itineraries', function (Blueprint $table) {
            // Drop unused date columns to avoid NOT NULL errors
            if (Schema::hasColumn('itineraries', 'start_date')) {
                $table->dropColumn('start_date');
            }
            if (Schema::hasColumn('itineraries', 'end_date')) {
                $table->dropColumn('end_date');
            }

            // Add fields used by the controller/model
            if (!Schema::hasColumn('itineraries', 'day_count')) {
                $table->integer('day_count')->default(1);
            }
            if (!Schema::hasColumn('itineraries', 'night_count')) {
                $table->integer('night_count')->default(0);
            }
            if (!Schema::hasColumn('itineraries', 'day_plans')) {
                $table->json('day_plans')->nullable();
            }
            // Ensure images column exists (it does in initial migration) but keep nullable
            // $table->json('images')->nullable(); // already present
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('itineraries', function (Blueprint $table) {
            // Recreate dropped columns (nullable to avoid future issues)
            if (!Schema::hasColumn('itineraries', 'start_date')) {
                $table->date('start_date')->nullable();
            }
            if (!Schema::hasColumn('itineraries', 'end_date')) {
                $table->date('end_date')->nullable();
            }

            // Drop added columns
            if (Schema::hasColumn('itineraries', 'day_count')) {
                $table->dropColumn('day_count');
            }
            if (Schema::hasColumn('itineraries', 'night_count')) {
                $table->dropColumn('night_count');
            }
            if (Schema::hasColumn('itineraries', 'day_plans')) {
                $table->dropColumn('day_plans');
            }
        });
    }
};
