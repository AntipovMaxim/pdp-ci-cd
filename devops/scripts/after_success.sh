if [ "$BUILD_LEADER" = "YES" ]; then
        if [ "$BUILD_AGGREGATE_STATUS" = "others_succeeded" ]; then
          echo "All jobs succeeded! PUBLISHING..."
        else
          echo "Some jobs failed"
        fi
      fi
