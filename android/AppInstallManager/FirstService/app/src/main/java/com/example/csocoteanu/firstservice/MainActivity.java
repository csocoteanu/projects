package com.example.csocoteanu.firstservice;

import java.util.ArrayList;
import java.util.List;

import android.app.ListActivity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Toast;

public class MainActivity extends ListActivity {
    class MainActivityItemClickListener<T> implements  AdapterView.OnItemClickListener
    {
        MainActivity mainActivity;

        public MainActivityItemClickListener(MainActivity ma)
        {
            this.mainActivity = ma;
        }

        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            List<String> packageNames = mainActivity.firstService.getWordList();
            String packageName = packageNames.get(position);

            Uri packageUri = Uri.parse(packageName);
            Intent uninstallIntent = new Intent(Intent.ACTION_DELETE, packageUri);
            startActivity(uninstallIntent);

            packageNames.remove(position);
            mainActivity.onClick(null);
        }
    }

    public FirstService firstService;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        wordList = new ArrayList<String>();
        adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1, android.R.id.text1, wordList);
        setListAdapter(adapter);

        this.getListView().setOnItemClickListener(new MainActivityItemClickListener<String>(this));
    }

    @Override
    protected void onResume() {
        super.onResume();

        Intent intent= new Intent(this, FirstService.class);
        bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
    }

    @Override
    protected void onPause() {
        super.onPause();

        unbindService(mConnection);
    }

    private ServiceConnection mConnection = new ServiceConnection() {

        public void onServiceConnected(ComponentName className, IBinder binder) {
            FirstService.MyBinder b = (FirstService.MyBinder) binder;
            firstService = b.getService();

            Toast.makeText(MainActivity.this, "Focused", Toast.LENGTH_SHORT).show();
        }

        public void onServiceDisconnected(ComponentName className) {
            Log.d("FS","========>" + className.getClassName());
        }
    };
    public ArrayAdapter<String> adapter;
    private List<String> wordList;

    public void onClick(View view) {
        if (firstService != null) {
            Toast.makeText(this, "Number of elements" + firstService.getWordList().size(), Toast.LENGTH_SHORT).show();

            wordList.clear();
            wordList.addAll(firstService.getWordList());
            adapter.notifyDataSetChanged();
        }
    }
}