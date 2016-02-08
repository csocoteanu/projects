package com.example.csocoteanu.firstservice;

import java.util.Calendar;

import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

public class MyScheduleReceiver extends BroadcastReceiver {
    // restart service every 30 seconds
    private static final long REPEAT_TIME = 1000 * 30;

    @Override
    public void onReceive(Context context, Intent intent) {
       if (intent == null || intent.getAction() == null || intent.getData() == null) {
           Log.d("FS", "=======> MyScheduleReceiver::onReceive::empty!!!!!!");
           return;
       }

        String message = "=======> MyScheduleReceiver::onReceive::" + intent.getAction() + "->" + intent.getData();
        Log.d("FS", message);

        if (intent.getAction().toLowerCase().contains("added")) {
            Log.d("FS", "==========> MySchedulerService::notifying service.......");

            Intent service = new Intent(context, FirstService.class);
            service.setAction(intent.getData().toString());
            context.startService(service);
        }

        /*
        AlarmManager service = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent i = new Intent(context, MyStartServiceReceiver.class);
        PendingIntent pending = PendingIntent.getBroadcast(context, 0, i, PendingIntent.FLAG_CANCEL_CURRENT);
        Calendar cal = Calendar.getInstance();
        // start 30 seconds after boot completed
        cal.add(Calendar.SECOND, 30);
        // fetch every 30 seconds
        // InexactRepeating allows Android to optimize the energy consumption
        service.setInexactRepeating(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), REPEAT_TIME, pending);

        // service.setRepeating(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(),
        // REPEAT_TIME, pending);


        MyStartServiceReceiver msr = new MyStartServiceReceiver();
        IntentFilter intentFilter = new IntentFilter();

        intentFilter.addAction(Intent.ACTION_PACKAGE_ADDED);
        intentFilter.addAction(Intent.ACTION_PACKAGE_INSTALL);
        intentFilter.addAction(Intent.ACTION_PACKAGE_CHANGED);

        context.registerReceiver(msr, intentFilter);*/
    }
}