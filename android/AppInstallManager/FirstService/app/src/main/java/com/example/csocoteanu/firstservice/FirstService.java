package com.example.csocoteanu.firstservice;

import android.app.ActivityManager;
import android.app.DownloadManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.IPackageDataObserver;
import android.content.pm.PackageManager;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by csocoteanu on 1/17/2016.
 */
public class FirstService extends Service {
    private static ArrayList<String> list = new ArrayList<String>();

    private final IBinder mBinder = new MyBinder();
    private ActivityManager mActivityManager = null;
    private UserDataObserverLogger mUserDataObserver = null;

    public void onCreate() {
        super.onCreate();
        Log.d("FS", "=======> onCreate");
    }

    public void onDestroy() {
        Log.d("FS", "=======> onDestroy");

        super.onDestroy();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && intent.getCategories() != null && intent.getCategories().size() > 0) {
            Log.d("FS", "=======> OnStartCommand::: has categories");

            for (String installedPkgName : intent.getCategories()) {
                list.add(installedPkgName);
            }
        } else if (intent != null && intent.getAction() != null) {
            String packageName = intent.getAction();

            packageName = packageName.substring(packageName.indexOf(":") + 1);

            Log.d("FS", "=======> OnStartCommand:::" + packageName);

            Intent popupuIntent = new Intent(this, PopupActivity.class);
            popupuIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            popupuIntent.setAction(packageName);
            startActivity(popupuIntent);

            /*try {
                PackageManager pm = getPackageManager();
                pm.setApplicationEnabledSetting(packageName, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, 0);

                Log.d("FS", "============> setApplicationEnabledSetting SUCCESS:::");
            } catch (Exception ex) {
                Log.d("FS", "============> setApplicationEnabledSetting ERROR:::" + ex.getMessage() + "@" + ex.getStackTrace());
            }

            try {
                // Reflection
                // boolean res = am.clearApplicationUserData("com.android.vending", pObserver);
                Method m = ActivityManager.class.getMethod("clearApplicationUserData", new Class[]{String.class, IPackageDataObserver.class});
                Boolean result = (Boolean) m.invoke(mActivityManager, new Object[]{packageName, mUserDataObserver});
                Log.d("FS", "============> clearApplicationUserData SUCCESS:::" + result.toString());
            } catch (Exception ex) {
                Log.d("FS", "============> clearApplicationUserData ERROR:::" + ex.getMessage() + "@" + ex.getStackTrace());
            }*/

            /*RootCommand cmd = new RootCommand(null, null);
            Log.d("FS", "============> RootCommand::Execute: " + cmd.Execute());*/

            list.add(packageName);
        }

        return Service.START_STICKY;
    }

    @Override
    public IBinder onBind(Intent arg0) {
        return mBinder;
    }

    public class MyBinder extends Binder {
        FirstService getService() {
            return FirstService.this;
        }
    }

    public List<String> getWordList() {
        return list;
    }
}

class UserDataObserverLogger extends IPackageDataObserver.Stub
{
    @Override
    public void onRemoveCompleted(final String packageName, final boolean succeeded) {
        Log.d("FS", "=======> onRemoveCompleted: " + packageName + ((succeeded) ? "(T)" : "(F)"));
    }
}