package com.example.csocoteanu.firstservice;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.util.Log;

import java.util.List;

public class MyStartServiceReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("FS", "=======> MyStartServiceReceiver::onReceive");
        Intent service = new Intent(context, FirstService.class);

        Intent mainIntent = new Intent(Intent.ACTION_MAIN, null);
        // mainIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> pkgAppsList = context.getPackageManager().queryIntentActivities( mainIntent, 0);
        for (ResolveInfo ri : pkgAppsList) {
            service.addCategory(ri.activityInfo.applicationInfo.processName);
        }

        service.setAction("cucucu");

        context.startService(service);
    }
}